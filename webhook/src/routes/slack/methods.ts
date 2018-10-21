import { Method } from './engine'

export const methods: { [key: string]: Method } = {
  help: {
    lexer: null,
    render: async () => ({
      text: `
You can send kudos or get leaderboard!

Try the following commands:
  /kudos send @user and /kudos leaderboard
    `,
    }),
  },
  send: {
    lexer: /^<@(.*)\|(.*)>.?(.*)/,
    render: async (req, cmd, args) => {
      const [, recipientSlackId, recipientName] = args
      const senderSlackId = cmd.user_id
      const conversationSlackId = cmd.channel_id

      if (!recipientSlackId) {
        return { text: 'No recipient defined...' }
      }

      if (senderSlackId === recipientSlackId) {
        return { text: "Well well, you can't send kudos to yourself..." }
      }

      const res: any = await req.gql.request(
        `
      mutation SendKudos($data: SendKudoInput!) {
        sendKudos(data: $data) {
          id
        }
      }
      `,
        {
          data: {
            senderSlackId,
            recipientSlackId,
            conversationSlackId,
          },
        },
      )

      return {
        text: `You sent kudos to <@${recipientSlackId}>!`,
        attachments: [
          {
            text: 'Do you want to share it with other members of this channel?',
            callback_id: 'share_kudo',
            color: '#3AA3E3',
            actions: [
              {
                name: 'share',
                type: 'button',
                value: res.sendKudos.id,
                text: 'Yes, Share!',
              },
              {
                name: 'dont-share',
                type: 'button',
                value: 'cancel',
                text: 'Nah...',
              },
            ],
          },
        ],
      }
    },
  },
  leaderboard: {
    lexer: null,
    render: async (req, cmd, args) => {
      const conversationSlackId = cmd.channel_id

      const res: any = await req.gql.request(
        `
      query ChannelLeaderboard($slackId: String!) {
        channelLeaderboard(slackId: $slackId, timePeriod: LAST_WEEK) {
          topReceivers {
            slackId
            score
          }
          topSenders {
            slackId
            score
          }
        }
      }
      `,
        {
          slackId: conversationSlackId,
        },
      )

      const topReceivers = res.channelLeaderboard.topReceivers
      const topSenders = res.channelLeaderboard.topSenders

      return {
        text: `
These is the top receivers for the last week: 🏆\n
    ${topReceivers[0] && `🥇 <@${topReceivers[0].slackId}>\n`}
    ${topReceivers[1] && `🥈 <@${topReceivers[1].slackId}>\n`}
    ${topReceivers[2] && `🥉 <@${topReceivers[2].slackId}>\n`}
\n
These is the top givers for the last week: ⛑\n
    ${topSenders[0] && `🥇 <@${topSenders[0].slackId}>\n`}
    ${topSenders[1] && `🥈 <@${topSenders[1].slackId}>\n`}
    ${topSenders[2] && `🥉 <@${topSenders[2].slackId}>\n`}
\n
💩 Everybody else
        `,
      }
    },
  },
}
