import * as fetch from 'isomorphic-fetch'

export interface SlackOptions {
  organization: string
  apiToken: string
}

export interface SlackUser {
  real_name: string
  image_24: string
  image_32: string
  image_48: string
  image_72: string
  image_192: string
  image_512: string
}

export interface SlackConversation {
  id: string
  name: string
  creator: string
}

export enum SlackMessageType {
  'in_channel',
  'ephemeral',
}

export interface SlackMessage {
  text: string
  response_type?: SlackMessageType
  attachments?: SlackAttachment[]
}

export interface SlackAttachment {
  pretext?: string
  author_name?: string
  title?: string
  text: string
  callback_id?: string
  color?: string
  actions?: SlackAttachmentAction[]
  image_url?: string
  thumb_url?: string
}

export interface SlackAttachmentAction {
  name: string
  text: string
  type: string
  value: string
  style?: string
}

export interface SlackCommand {
  token: string
  team_id: string
  team_domain: string
  channel_id: string
  channel_name: string
  user_id: string
  user_name: string
  command: string
  text: string
  response_url: string
  trigger_id: string
}

export interface SlackChannel {
  id: string
  name: string
}

export interface SlackUser {
  id: string
  name: string
}

export interface SlackAction {
  type: string
  callback_id: string
  actions: SlackAttachmentAction[]
  channel: SlackChannel
  user: SlackUser
  original_message?: SlackMessage
  response_url: string
}

export class Slack {
  private organization: string
  private apiToken: string

  constructor(options: SlackOptions) {
    this.organization = options.organization
    this.apiToken = options.apiToken
  }

  getApiURL(method: string): string {
    return `https://${this.organization}.slack.com/api/${method}`
  }

  async executeMethod<T>(method: string, body: any): Promise<T> {
    return fetch(this.getApiURL(method), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    }).then(res => res.json())
  }

  async getUser(slackId: string): Promise<SlackUser> {
    const body = new URLSearchParams()

    body.append('user', slackId)
    body.append('token', this.apiToken)

    return this.executeMethod<any>('users.profile.get', body).then(
      res => res.profile,
    )
  }

  async getConversation(slackId: string): Promise<SlackConversation> {
    const body = new URLSearchParams()

    body.append('channel', slackId)
    body.append('token', this.apiToken)

    return this.executeMethod<any>('conversations.info', body).then(
      res => res.channel,
    )
  }

  async sendMessage(
    channelSlackId: string,
    message: SlackMessage,
  ): Promise<void> {
    const body = new URLSearchParams()

    body.append('channel', channelSlackId)
    body.append('text', message.text)
    body.append('token', this.apiToken)

    if (message.attachments) {
      body.append('attachments', JSON.stringify(message.attachments))
    }

    return this.executeMethod<any>('chat.postMessage', body).then(res => {
      return res.message
    })
  }
}
