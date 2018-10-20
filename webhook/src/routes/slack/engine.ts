import { Request } from 'express'
import { methods } from './methods'

export enum SlackResponseType {
  'in_channel',
  'ephemeral',
}

export interface SlackResponse {
  text: string
  response_type?: SlackResponseType
  attachments?: SlackAttachment[]
}

export interface SlackAttachment {
  pretext?: string
  author_name?: string
  title?: string
  text: string
  callback_id?: string
  color?: string
  actions?: SlackAction[]
  image_url?: string
  thumb_url?: string
}

export interface SlackAction {
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

export interface Method {
  lexer: RegExp
  render: (
    req: Request,
    slackCommand: SlackCommand,
    args?: string[],
  ) => Promise<SlackResponse>
}

function parser(args: string, lexer: RegExp): string[] {
  const parsedArguments = args.match(lexer)

  if (parsedArguments.length <= 1) {
    throw new Error(`Couldn't parse ${args} with ${lexer}`)
  }

  return parsedArguments
}

export async function run(
  req: Request,
  slackCommand: SlackCommand,
): Promise<SlackResponse> {
  const [command, ...unparsedArguments] = slackCommand.text.split(' ')

  if (!command) {
    return { text: `No command specified. Try \kudos help!` }
  }

  if (!command || !methods.hasOwnProperty(command)) {
    return { text: `Couldn't find command ${command}. Try \kudos help!` }
  }

  try {
    const method = methods[command]
    if (unparsedArguments) {
      const parsedArguments = parser(unparsedArguments.join(' '), method.lexer)
      return method.render(req, slackCommand, parsedArguments)
    } else {
      return method.render(req, slackCommand, [])
    }
  } catch (err) {
    return { text: `Incorrect arguments provided...` }
  }
}
