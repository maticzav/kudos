import { Request } from 'express'

interface SlackEvent {
  type: string
  [key: string]: any
}

export async function handleSubscriptionEvent(req: Request, event: SlackEvent) {
  switch (event.type) {
    case 'channel_created': {
      console.log('new channel')
      return
    }
    case 'channel_deleted': {
      console.log('deleted channel')
      return
    }
    case 'group_open': {
      console.log('new channel')
      return
    }
    case 'group_deleted': {
      console.log('deleted channel')
      return
    }
  }
}
