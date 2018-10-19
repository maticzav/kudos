import { Session } from 'neo4j-driver/types/v1'

export interface Context {
  request: any
  neo4j: Session
}
