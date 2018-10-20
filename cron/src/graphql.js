import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'node-fetch'
import { HttpLink } from 'apollo-link-http'
import gql from 'graphql-tag'

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://npm-suggestions.now.sh',
    fetch,
  }),
  cache: new InMemoryCache(),
})

const compitingChannels = gql`
  query compitingChannels(timePeriod: TIME_PERIOD
  ) {
    slackId
  }
`

export async function getCompitingChannels() {
  const res = await client.query({
    query: compitingChannels,
  })

  const hits = res.data
  return hits
}
