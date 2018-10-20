import { GraphQLServer } from 'graphql-yoga'

import { resolvers, fragmentReplacements } from './resolvers'

import { getNeo4JSession } from './neo4j'
import { Slack } from './slack'

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  mocks: true,
  context: req => ({
    ...req,
    // neo4j: getNeo4JSession(),
    slack: new Slack({
      organization: process.env.SLACK_ORGANIZATION,
      apiToken: process.env.SLACK_API_TOKEN,
    }),
  }),
})

server
  .start({
    port: process.env.PORT,
  })
  .then(() => {
    console.log(`Server listening on http://localhost:${process.env.PORT}`)
  })
