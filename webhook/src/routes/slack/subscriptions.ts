import { Request } from 'express'

interface SlackEvent {
  type: string
  [key: string]: any
}

export async function handleSubscriptionEvent(req: Request, event: SlackEvent) {
  switch (event.type) {
    case 'channel_created': {
      const channel = await req.gql.request(
        `
        mutation CreateConversation($slackId: String!, $settings: ConversationSettingsInput!) {
          createConversation(slackId: $slackId, settings: $settings) {
            id
          }
        }
      `,
        {
          slackId: event.channel.id,
          settings: {
            organiseCompetition: false,
            sendEngagementMessages: false,
          },
        },
      )

      return channel
    }
    case 'channel_deleted': {
      const channel = await req.gql.request(
        `
        mutation DeleteConversation($slackId: String!) {
          deleteConversation(slackId: $slackId) {
            id
          }
        }
      `,
        { slackId: event.channel },
      )

      return channel
    }
    case 'group_open': {
      const channel = await req.gql.request(
        `
        mutation CreateConversation($slackId: String!, $settings: ConversationSettingsInput!) {
          createConversation(slackId: $slackId, settings: $settings) {
            id
          }
        }
      `,
        {
          slackId: event.channel,
          settings: {
            organiseCompetition: false,
            sendEngagementMessages: false,
          },
        },
      )

      return channel
    }
    case 'group_deleted': {
      const channel = await req.gql.request(
        `
        mutation DeleteConversation($slackId: String!) {
          deleteConversation(slackId: $slackId) {
            id
          }
        }
      `,
        { slackId: event.channel },
      )

      return channel
    }
  }
}
