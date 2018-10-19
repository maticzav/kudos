import { ApolloServer, gql } from 'apollo-server'
import { importSchema } from 'graphql-import'

import { resolvers, fragmentReplacements } from './resolvers'

import { getNeo4JSession } from './neo4j'

const typeDefs = gql(importSchema('./src/schema.graphql'))

const server = new ApolloServer({
  typeDefs,
  resolvers,
  mocks: true,
  context: req => ({
    ...req,
    neo4j: getNeo4JSession(),
  }),
})

server.listen().then(({ url }) => {
  console.log(`Server listening on ${url}`)
})
