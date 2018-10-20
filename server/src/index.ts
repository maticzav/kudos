import { GraphQLServer } from 'graphql-yoga'
import { importSchema } from 'graphql-import'

import { resolvers, fragmentReplacements } from './resolvers'

import { getNeo4JSession } from './neo4j'
import { Slack } from './slack'

const typeDefs = importSchema('./src/schema.graphql')

const server = new GraphQLServer({
  typeDefs,
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
