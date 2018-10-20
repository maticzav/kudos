import { Request } from 'express'

enum SlackResponseType {
  'in_channel',
  'ephemeral',
}

interface SlackResponse {
  text: string
  response_type?: SlackResponseType
  attachments?: SlackAttachment[]
}

interface SlackAttachment {
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

interface SlackAction {
  name: string
  text: string
  type: string
  value: string
  style?: string
}

interface SlackCommand {
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

interface Method {
  lexer: RegExp
  render: (
    req: Request,
    slackCommand: SlackCommand,
    args?: string[],
  ) => Promise<SlackResponse>
}

const methods: { [key: string]: Method } = {
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

      if (!recipientSlackId) {
        return { text: 'No recipient defined...' }
      }

      const kudo = { id: 'fo' }

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
                value: kudo.id,
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
    render: async () => {
      return {
        text: 'This is our leaderboard!',
      }
    },
  },
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
