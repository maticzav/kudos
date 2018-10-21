import * as fetch from 'isomorphic-fetch'
import { URLSearchParams } from 'url'

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

  async postToChannel(slackId: string, text: string): Promise<SlackUser> {
    const body = new URLSearchParams()

    body.append('token', this.apiToken)
    body.append('channel', slackId)
    body.append('text', text)

    return this.executeMethod<any>('chat.postMessage', body).then(res => res)
  }
}
