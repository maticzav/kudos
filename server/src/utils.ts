import { Prisma } from './generated/prisma'
import { Slack } from './slack'

export interface Context {
  db: Prisma
  slack: Slack
  request: any
}
