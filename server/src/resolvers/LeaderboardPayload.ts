import { Context } from '../utils'

const timePeriodToDate = timePeriod => {
  let date = new Date()

  switch (timePeriod) {
    case 'LAST_WEEK':
      date.setDate(date.getDate() - 7)
      break

    case 'LAST_MONTH':
      date.setMonth(date.getMonth() - 1)
      break

    case 'LAST_YEAR':
      date.setFullYear(date.getFullYear() - 1)
      break
  }

  const ISODate = date.toISOString()

  return ISODate
}

export const LeaderboardPayload = {
  async topReceivers(
    { slackId: channelId, timePeriod },
    args,
    ctx: Context,
    info,
  ) {
    const ISODate = timePeriodToDate(timePeriod)

    console.log(ISODate)

    const channelUserIds = await ctx.slack.getConversationMembers(channelId)

    const numberOfKudosReceivedByUser = await Promise.all(
      channelUserIds.map(async userId => {
        const numberOfKudosReceived = await ctx.db.query.kudoesConnection(
          {
            where: {
              receivedBy: { slackId: userId },
              createdAt_gte: ISODate,
            },
          },
          ` { 
            aggregate {
              count
            }
          } `,
        )

        return {
          slackId: userId,
          score: numberOfKudosReceived.aggregate.count,
        }
      }),
    )

    return numberOfKudosReceivedByUser.sort(
      (user1, user2) => user2.score - user1.score,
    )
  },

  async topSenders(
    { slackId: channelId, timePeriod },
    args,
    ctx: Context,
    info,
  ) {
    const ISODate = timePeriodToDate(timePeriod)

    const channelUserIds = await ctx.slack.getConversationMembers(channelId)

    const numberOfKudosSentByUser = await Promise.all(
      channelUserIds.map(async userId => {
        const numberOfKudosSent = await ctx.db.query.kudoesConnection(
          {
            where: {
              sentBy: { slackId: userId },
              createdAt_gte: ISODate,
            },
          },
          ` { 
            aggregate {
              count
            }
          } `,
        )

        return {
          slackId: userId,
          score: numberOfKudosSent.aggregate.count,
        }
      }),
    )

    console.log(numberOfKudosSentByUser)

    return numberOfKudosSentByUser.sort(
      (user1, user2) => user2.score - user1.score,
    )
  },

  async topScorers(
    { slackId: channelId, timePeriod },
    args,
    ctx: Context,
    info,
  ) {
    const ISODate = timePeriodToDate(timePeriod)

    const channelUserIds = await ctx.slack.getConversationMembers(channelId)

    const numberOfKudosReceivedByUser = await Promise.all(
      channelUserIds.map(async userId => {
        const numberOfKudosReceived = await ctx.db.query.kudoesConnection(
          {
            where: {
              receivedBy: { slackId: userId },
              createdAt_gte: ISODate,
            },
          },
          ` { 
            aggregate {
              count
            }
          } `,
        )

        return {
          slackId: userId,
          score: numberOfKudosReceived.aggregate.count,
        }
      }),
    )

    return numberOfKudosReceivedByUser.sort(
      (user1, user2) => user2.score - user1.score,
    )
  },
}
