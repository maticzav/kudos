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
  actions: SlackAction[]
  image_url?: string
  thumb_url?: string
}

interface SlackAction {
  name: string
  text: string
  type: string
  value: string
  style: string
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
    args?: any,
  ) => Promise<SlackResponse>
}

const methods: { [key: string]: Method } = {
  help: {
    lexer: /a/,
    render: async () => ({
      text: `
      You can send kudos or get leaderboard!

      Try the following commands:
        /kudos send @user and /kudos leaderboard
    `,
    }),
  },
  send: {
    lexer: /a/,
    render: async (req, args) => {
      const kudo = req.kudos

      return {
        text: `You sent kudos to ${args}`,
      }
    },
  },
}

function run(req: Request, slackCommand: SlackCommand) {
  const [command, unparsedArguments] = slackCommand.text.split(' ')

  if (!command) {
    return `No command specified. Try \kudos help!`
  }

  if (!command || !methods.hasOwnProperty(command)) {
    return `Couldn't find command ${command}. Try \kudos help!`
  }

  const method = methods[command]
  const parsedArguments = unparsedArguments.match(method.lexer)

  return method.render(req, slackCommand, parsedArguments)
}
