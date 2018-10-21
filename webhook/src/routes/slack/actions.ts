import { SlackAction, SlackMessage } from '../../slack'
import { Request } from 'express'

export async function handleActionEvent(
  req: Request,
  payload: SlackAction,
): Promise<SlackMessage> {
  switch (payload.callback_id) {
    case 'share_kudo': {
      const [action] = payload.actions

      switch (action.name) {
        case 'share': {
          const { kudo }: any = await req.gql.request(
            `
            query GetKudo($id: ID!) {
              kudo(id: $id) {
                id
                message
                sentBy { slackId }
                receivedBy { slackId }
                sentInConversation { slackId }
              }
            }
          `,
            { id: action.value },
          )

          const message = {
            text: `
<@${kudo.sentBy.slackId}> just sent Kudos to <@${kudo.receivedBy.slackId}>!

${kudo.message ? kudo.message : ''}
          `,
          }

          const res = await req.slack.sendMessage(
            kudo.sentInConversation.slackId,
            message,
          )

          return {
            text: 'Kudo successfully shared!',
          }
        }
        case 'dont-share': {
          return {
            text: 'Maybe next time...',
          }
        }
      }
    }
    default: {
      return { text: 'Unknown action...' }
    }
  }
}
