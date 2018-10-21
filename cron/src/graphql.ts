import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'node-fetch'
import { HttpLink } from 'apollo-link-http'
import gql from 'graphql-tag'

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.KUDOS_ENDPOINT,
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

const channelLeaderboardWeek = gql`
  query channelLeaderboard($slackId: String!) {
    channelLeaderboard(slackId: $slackId, timePeriod: LAST_WEEK) {
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

const channelLeaderboardMonth = gql`
  query channelLeaderboard($slackId: String!) {
    channelLeaderboard(slackId: $slackId, timePeriod: LAST_MONTH) {
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

export async function getChannelLeaderboardWeek(slackId) {
  const res: any = await client.query({
    query: channelLeaderboardWeek,
    variables: { slackId },
  })

  return res.data.channelLeaderboard
}

export async function getChannelLeaderboardMonth(slackId) {
  const res: any = await client.query({
    query: channelLeaderboardMonth,
    variables: { slackId },
  })

  return res.data.channelLeaderboard
}
