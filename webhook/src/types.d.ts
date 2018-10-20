import { Slack } from './slack'
import { GraphQLClient } from 'graphql-request'

declare global {
  namespace Express {
    export interface Request {
      slack: Slack
      gql: GraphQLClient
    }
  }
}
