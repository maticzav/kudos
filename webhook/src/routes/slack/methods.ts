import { Method } from './engine'

export const methods: { [key: string]: Method } = {
  help: {
    lexer: /.*/,
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
    lexer: /.*/,
    render: async (req, cmd, args) => {
      const conversationSlackId = cmd.channel_id

      const res: any = await req.gql.request(
        `
      query channelLeaderboard($slackId: String!) {
        channelLeaderboard(slackId: $slackId, timePeriod: LAST_WEEK) {
          topReceivers{
            slackId
            score
          }
          topSenders{
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

      return {
        text: `These is the top receivers <@${res.topReceivers[0]})!`,
      }
    },
  },
}
