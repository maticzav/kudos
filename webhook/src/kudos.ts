import * as fetch from 'isomorphic-fetch'
import { Binding } from './generated/kudos'
import { HttpLink } from 'apollo-link-http'
import { importSchema } from 'graphql-import'
import { makeRemoteExecutableSchema } from 'graphql-tools'

const typeDefs = importSchema('src/generated/schema.graphql')

export class KudosBinding extends Binding {
  constructor({ uri }) {
    const link = new HttpLink({ uri, fetch })

    const schema = makeRemoteExecutableSchema({ link, schema: typeDefs })

    super({
      schema,
    })
  }
}
