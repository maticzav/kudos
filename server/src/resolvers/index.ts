import { extractFragmentReplacements } from 'prisma-binding'
import { Mutation } from './Mutation'
import { Query } from './Query'
import { LeaderboardPayload } from './LeaderboardPayload'

export const resolvers = {
  Mutation,
  Query,
  LeaderboardPayload,
}

export const fragmentReplacements = extractFragmentReplacements(resolvers)
