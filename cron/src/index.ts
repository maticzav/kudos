const ontime = require('ontime')
import {
  getCompetingConversations,
  getEngagedCompetitions,
  getChannelLeaderboard,
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

    const leaderboards = conversationsToNotify.map(async conversation => {
      const leaderboardsResponse = await getChannelLeaderboard(
        conversation,
        'LAST_MONTH',
      )

      return {
        topReceivers: leaderboardsResponse.topReceivers,
        topSenders: leaderboardsResponse.topSenders,
        slackId: conversation,
      }
    })

    Promise.all(
      leaderboards.forEach(leaderboard =>
        slack.postToChannel(
          leaderboard.slackId,
          leaderboardRenderer(leaderboard.topReceivers, leaderboard.topS),
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

    const leaderboards = conversationsToNotify.map(async conversation => {
      const leaderboardsResponse = await getChannelLeaderboard(
        conversation,
        'LAST_WEEK',
      )

      return {
        topReceivers: leaderboardsResponse.topReceivers,
        topSenders: leaderboardsResponse.topSenders,
        slackId: conversation,
      }
    })

    Promise.all(
      leaderboards.forEach(leaderboard =>
        slack.postToChannel(
          leaderboard.slackId,
          leaderboardRenderer(leaderboard.topReceivers, leaderboard.topS),
        ),
      ),
    )
  },
)

const leaderboardRenderer = (topReceivers, topSenders) => `
These are the top receivers: 🏆\n
    🥇 <@${topReceivers[0] && topReceivers[0].slackId}>\n
    🥈 <@${topReceivers[1] && topReceivers[1].slackId}>\n
    🥉 <@${topReceivers[2] && topReceivers[2].slackId}>\n
\n
These are the top givers: ⛑\n
    🥇 <@${topSenders[0] && topSenders[0].slackId}>\n
    🥈 <@${topSenders[1] && topSenders[1].slackId}>\n
    🥉 <@${topSenders[2] && topSenders[2].slackId}>\n
\n
💩 Everybody else
        `
