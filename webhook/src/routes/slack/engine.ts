import { Request } from 'express'
import { methods } from './methods'
import { SlackCommand, SlackMessage } from '../../slack'

export interface Method {
  lexer: RegExp
  render: (
    req: Request,
    slackCommand: SlackCommand,
    args?: string[],
  ) => Promise<SlackMessage>
}

function parser(args: string, lexer: RegExp): string[] {
  if (!lexer) {
    return []
  }

  const parsedArguments = args.match(lexer)

  if (parsedArguments.length <= 1) {
    throw new Error(`Couldn't parse ${args} with ${lexer}`)
  }

  return parsedArguments
}

export async function run(
  req: Request,
  slackCommand: SlackCommand,
): Promise<SlackMessage> {
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
