import { Slack } from './slack'
import { KudosBinding } from './kudos'

declare global {
  namespace Express {
    export interface Request {
      slack: Slack
      kudos: KudosBinding
    }
  }
}
