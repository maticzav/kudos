import { ApolloServer, gql } from 'apollo-server'
import { importSchema } from 'graphql-import'

import { resolvers, fragmentReplacements } from './resolvers'

const typeDefs = gql(importSchema('./src/schema.graphql'))

const server = new ApolloServer({
  typeDefs,
  resolvers,
  mocks: true,
})

server.listen().then(({ url }) => {
  console.log(`Server listening on ${url}`)
})
