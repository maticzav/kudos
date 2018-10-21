const ontime = require('ontime')
import {
  getCompetingConversations,
  getEngagedCompetitions,
  getChannelLeaderboardWeek,
  getChannelLeaderboardMonth,
} from './graphql'
import { Slack } from './slack'

const slack = new Slack({
  organization: process.env.SLACK_ORGANIZATION,
  apiToken: process.env.SLACK_API_TOKEN,
})

ontime(
  {
    cycle: ['1T12:00:00'],
  },
  async ot => {
    const conversationsToNotify = await getCompetingConversations()

    const leaderboards: Promise<any>[] = conversationsToNotify.map(
      async conversation => {
        const leaderboardsResponse = await getChannelLeaderboardWeek(
          conversation.slackId,
        )

        return {
          topReceivers: leaderboardsResponse.topReceivers,
          topSenders: leaderboardsResponse.topSenders,
          slackId: conversation.slackId,
        }
      },
    )

    Promise.all(leaderboards).then(res =>
      res.forEach(leaderboard =>
        slack.postToChannel(
          leaderboard.slackId,
          leaderboardRenderer(
            leaderboard.topReceivers,
            leaderboard.topSenders,
            'week',
          ),
        ),
      ),
    )
  },
)

ontime(
  {
    cycle: ['Monday 12:00:00'],
  },
  async ot => {
    const conversationsToNotify = await getEngagedCompetitions()

    const leaderboards: Promise<any>[] = conversationsToNotify.map(
      async conversation => {
        const leaderboardsResponse = await getChannelLeaderboardMonth(
          conversation.slackId,
        )

        return {
          topReceivers: leaderboardsResponse.topReceivers,
          topSenders: leaderboardsResponse.topSenders,
          slackId: conversation.slackId,
        }
      },
    )

    Promise.all(leaderboards).then(res =>
      res.forEach(leaderboard =>
        slack.postToChannel(
          leaderboard.slackId,
          leaderboardRenderer(
            leaderboard.topReceivers,
            leaderboard.topSenders,
            'month',
          ),
        ),
      ),
    )
  },
)

const leaderboardRenderer = (topReceivers, topSenders, timePeriod) => `
These are the top receivers for the last ${timePeriod}: 🏆\n
    🥇 <@${topReceivers[0] && topReceivers[0].slackId}>\n
    🥈 <@${topReceivers[1] && topReceivers[1].slackId}>\n
    🥉 <@${topReceivers[2] && topReceivers[2].slackId}>\n
\n
These are the top givers for the last ${timePeriod}: ⛑\n
    🥇 <@${topSenders[0] && topSenders[0].slackId}>\n
    🥈 <@${topSenders[1] && topSenders[1].slackId}>\n
    🥉 <@${topSenders[2] && topSenders[2].slackId}>\n
\n
💩 Everybody else
        `
