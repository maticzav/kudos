import { GraphQLServer } from 'graphql-yoga'
import { Prisma } from './generated/prisma'
import { Slack } from './slack'

import { resolvers, fragmentReplacements } from './resolvers'

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    slack: new Slack({
      organization: process.env.SLACK_ORGANIZATION,
      apiToken: process.env.SLACK_API_TOKEN,
    }),
    db: new Prisma({
      fragmentReplacements,
      endpoint: process.env.PRISMA_ENDPOINT,
      debug: true,
      secret: process.env.PRISMA_SECRET,
    }),
  }),
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
