import * as fetch from 'isomorphic-fetch'

export interface SlackOptions {
  organization: string
  apiToken: string
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

  async invite(email: string): Promise<boolean> {
    const body = new URLSearchParams()

    body.append('email', email)
    body.append('token', this.apiToken)

    const res = await fetch(this.getApiURL(`users.admin.invite`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    }).then(res => res.json())

    if (res.ok) {
      return true
    } else {
      switch (res.error) {
        case 'already_invited':
          throw new Error('Izgleda, da smo te že povabili, preveri svoj mail!')

        case 'already_in_team':
          throw new Error(
            'Izgleda, da si že prijavljen v Slack Gimnazije Bežigrad!',
          )

        default:
          throw new Error('Nekaj je šlo narobe.')
      }
    }
  }
}
