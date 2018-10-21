import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'node-fetch'
import { HttpLink } from 'apollo-link-http'
import gql from 'graphql-tag'

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://0d1f0ef4.ngrok.io',
    fetch,
  }),
  cache: new InMemoryCache(),
})

const competingConversations = gql`
  query competingConversations {
    competingConversations {
      slackId
    }
  }
`

const engagedCompetitions = gql`
  query engagedCompetitions {
    engagedCompetitions {
      slackId
    }
  }
`

const channelLeaderboard = gql`
  query channelLeaderboard($slackId: String!, $timePeiod: TIME_PERIOD!) {
    channelLeaderboard(slackId: $slackId, timePeriod: $timePeiod) {
      topReceivers {
        slackId
        score
      }
      topSenders {
        slackId
        score
      }
    }
  }
`

export async function getCompetingConversations() {
  const res: any = await client.query({
    query: competingConversations,
  })

  return res.data.competingConversations
}

export async function getEngagedCompetitions() {
  const res: any = await client.query({
    query: engagedCompetitions,
  })

  return res.data.engagedCompetitions
}

export async function getChannelLeaderboard(slackId, timePeriod) {
  const res: any = await client.query({
    query: channelLeaderboard,
    variables: { slackId, timePeriod },
  })

  return res.data.channelLeaderboard
}
