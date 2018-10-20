import { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
import { IResolvers } from 'graphql-tools/dist/Interfaces'
import { Options } from 'graphql-binding'
import { makePrismaBindingClass, BasePrismaOptions } from 'prisma-binding'

export interface Query {
    members: <T = Member[]>(args: { where?: MemberWhereInput, orderBy?: MemberOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    kudoes: <T = Kudo[]>(args: { where?: KudoWhereInput, orderBy?: KudoOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    conversations: <T = Conversation[]>(args: { where?: ConversationWhereInput, orderBy?: ConversationOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    member: <T = Member | null>(args: { where: MemberWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    kudo: <T = Kudo | null>(args: { where: KudoWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    conversation: <T = Conversation | null>(args: { where: ConversationWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    membersConnection: <T = MemberConnection>(args: { where?: MemberWhereInput, orderBy?: MemberOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    kudoesConnection: <T = KudoConnection>(args: { where?: KudoWhereInput, orderBy?: KudoOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    conversationsConnection: <T = ConversationConnection>(args: { where?: ConversationWhereInput, orderBy?: ConversationOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    node: <T = Node | null>(args: { id: ID_Output }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
  }

export interface Mutation {
    createMember: <T = Member>(args: { data: MemberCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createKudo: <T = Kudo>(args: { data: KudoCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createConversation: <T = Conversation>(args: { data: ConversationCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateMember: <T = Member | null>(args: { data: MemberUpdateInput, where: MemberWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateKudo: <T = Kudo | null>(args: { data: KudoUpdateInput, where: KudoWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateConversation: <T = Conversation | null>(args: { data: ConversationUpdateInput, where: ConversationWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteMember: <T = Member | null>(args: { where: MemberWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteKudo: <T = Kudo | null>(args: { where: KudoWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteConversation: <T = Conversation | null>(args: { where: ConversationWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertMember: <T = Member>(args: { where: MemberWhereUniqueInput, create: MemberCreateInput, update: MemberUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertKudo: <T = Kudo>(args: { where: KudoWhereUniqueInput, create: KudoCreateInput, update: KudoUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertConversation: <T = Conversation>(args: { where: ConversationWhereUniqueInput, create: ConversationCreateInput, update: ConversationUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyMembers: <T = BatchPayload>(args: { data: MemberUpdateInput, where?: MemberWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyKudoes: <T = BatchPayload>(args: { data: KudoUpdateInput, where?: KudoWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyConversations: <T = BatchPayload>(args: { data: ConversationUpdateInput, where?: ConversationWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyMembers: <T = BatchPayload>(args: { where?: MemberWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyKudoes: <T = BatchPayload>(args: { where?: KudoWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyConversations: <T = BatchPayload>(args: { where?: ConversationWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    executeRaw: <T = Json>(args: { database?: PrismaDatabase, query: String }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
  }

export interface Subscription {
    member: <T = MemberSubscriptionPayload | null>(args: { where?: MemberSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    kudo: <T = KudoSubscriptionPayload | null>(args: { where?: KudoSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    conversation: <T = ConversationSubscriptionPayload | null>(args: { where?: ConversationSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> 
  }

export interface Exists {
  Member: (where?: MemberWhereInput) => Promise<boolean>
  Kudo: (where?: KudoWhereInput) => Promise<boolean>
  Conversation: (where?: ConversationWhereInput) => Promise<boolean>
}

export interface Prisma {
  query: Query
  mutation: Mutation
  subscription: Subscription
  exists: Exists
  request: <T = any>(query: string, variables?: {[key: string]: any}) => Promise<T>
  delegate(operation: 'query' | 'mutation', fieldName: string, args: {
    [key: string]: any;
}, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<any>;
delegateSubscription(fieldName: string, args?: {
    [key: string]: any;
}, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<any>>;
getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers;
}

export interface BindingConstructor<T> {
  new(options: BasePrismaOptions): T
}
/**
 * Type Defs
*/

const typeDefs = `type AggregateConversation {
  count: Int!
}

type AggregateKudo {
  count: Int!
}

type AggregateMember {
  count: Int!
}

type BatchPayload {
  """The number of nodes that have been affected by the Batch operation."""
  count: Long!
}

type Conversation implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  slackId: String!
  organiseCompetition: Boolean!
  sendEngagementMessages: Boolean!
}

"""A connection to a list of items."""
type ConversationConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [ConversationEdge]!
  aggregate: AggregateConversation!
}

input ConversationCreateInput {
  slackId: String!
  organiseCompetition: Boolean
  sendEngagementMessages: Boolean
}

input ConversationCreateOneInput {
  create: ConversationCreateInput
  connect: ConversationWhereUniqueInput
}

"""An edge in a connection."""
type ConversationEdge {
  """The item at the end of the edge."""
  node: Conversation!

  """A cursor for use in pagination."""
  cursor: String!
}

enum ConversationOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  slackId_ASC
  slackId_DESC
  organiseCompetition_ASC
  organiseCompetition_DESC
  sendEngagementMessages_ASC
  sendEngagementMessages_DESC
}

type ConversationPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  slackId: String!
  organiseCompetition: Boolean!
  sendEngagementMessages: Boolean!
}

type ConversationSubscriptionPayload {
  mutation: MutationType!
  node: Conversation
  updatedFields: [String!]
  previousValues: ConversationPreviousValues
}

input ConversationSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [ConversationSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [ConversationSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ConversationSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: ConversationWhereInput
}

input ConversationUpdateDataInput {
  slackId: String
  organiseCompetition: Boolean
  sendEngagementMessages: Boolean
}

input ConversationUpdateInput {
  slackId: String
  organiseCompetition: Boolean
  sendEngagementMessages: Boolean
}

input ConversationUpdateOneRequiredInput {
  create: ConversationCreateInput
  connect: ConversationWhereUniqueInput
  update: ConversationUpdateDataInput
  upsert: ConversationUpsertNestedInput
}

input ConversationUpsertNestedInput {
  update: ConversationUpdateDataInput!
  create: ConversationCreateInput!
}

input ConversationWhereInput {
  """Logical AND on all given filters."""
  AND: [ConversationWhereInput!]

  """Logical OR on all given filters."""
  OR: [ConversationWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ConversationWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime

  """All values that are not equal to given value."""
  updatedAt_not: DateTime

  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]

  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]

  """All values less than the given value."""
  updatedAt_lt: DateTime

  """All values less than or equal the given value."""
  updatedAt_lte: DateTime

  """All values greater than the given value."""
  updatedAt_gt: DateTime

  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  slackId: String

  """All values that are not equal to given value."""
  slackId_not: String

  """All values that are contained in given list."""
  slackId_in: [String!]

  """All values that are not contained in given list."""
  slackId_not_in: [String!]

  """All values less than the given value."""
  slackId_lt: String

  """All values less than or equal the given value."""
  slackId_lte: String

  """All values greater than the given value."""
  slackId_gt: String

  """All values greater than or equal the given value."""
  slackId_gte: String

  """All values containing the given string."""
  slackId_contains: String

  """All values not containing the given string."""
  slackId_not_contains: String

  """All values starting with the given string."""
  slackId_starts_with: String

  """All values not starting with the given string."""
  slackId_not_starts_with: String

  """All values ending with the given string."""
  slackId_ends_with: String

  """All values not ending with the given string."""
  slackId_not_ends_with: String
  organiseCompetition: Boolean

  """All values that are not equal to given value."""
  organiseCompetition_not: Boolean
  sendEngagementMessages: Boolean

  """All values that are not equal to given value."""
  sendEngagementMessages_not: Boolean
}

input ConversationWhereUniqueInput {
  id: ID
  slackId: String
}

scalar DateTime

"""Raw JSON value"""
scalar Json

type Kudo implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  sentBy(where: MemberWhereInput): Member!
  receivedBy(where: MemberWhereInput): Member!
  sentInConversation(where: ConversationWhereInput): Conversation!
  message: String
  publish: Boolean!
}

"""A connection to a list of items."""
type KudoConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [KudoEdge]!
  aggregate: AggregateKudo!
}

input KudoCreateInput {
  message: String
  publish: Boolean!
  sentBy: MemberCreateOneWithoutKudosSentInput!
  receivedBy: MemberCreateOneWithoutKudosReceivedInput!
  sentInConversation: ConversationCreateOneInput!
}

input KudoCreateManyWithoutReceivedByInput {
  create: [KudoCreateWithoutReceivedByInput!]
  connect: [KudoWhereUniqueInput!]
}

input KudoCreateManyWithoutSentByInput {
  create: [KudoCreateWithoutSentByInput!]
  connect: [KudoWhereUniqueInput!]
}

input KudoCreateWithoutReceivedByInput {
  message: String
  publish: Boolean!
  sentBy: MemberCreateOneWithoutKudosSentInput!
  sentInConversation: ConversationCreateOneInput!
}

input KudoCreateWithoutSentByInput {
  message: String
  publish: Boolean!
  receivedBy: MemberCreateOneWithoutKudosReceivedInput!
  sentInConversation: ConversationCreateOneInput!
}

"""An edge in a connection."""
type KudoEdge {
  """The item at the end of the edge."""
  node: Kudo!

  """A cursor for use in pagination."""
  cursor: String!
}

enum KudoOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  message_ASC
  message_DESC
  publish_ASC
  publish_DESC
}

type KudoPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  message: String
  publish: Boolean!
}

type KudoSubscriptionPayload {
  mutation: MutationType!
  node: Kudo
  updatedFields: [String!]
  previousValues: KudoPreviousValues
}

input KudoSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [KudoSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [KudoSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [KudoSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: KudoWhereInput
}

input KudoUpdateInput {
  message: String
  publish: Boolean
  sentBy: MemberUpdateOneRequiredWithoutKudosSentInput
  receivedBy: MemberUpdateOneRequiredWithoutKudosReceivedInput
  sentInConversation: ConversationUpdateOneRequiredInput
}

input KudoUpdateManyWithoutReceivedByInput {
  create: [KudoCreateWithoutReceivedByInput!]
  connect: [KudoWhereUniqueInput!]
  disconnect: [KudoWhereUniqueInput!]
  delete: [KudoWhereUniqueInput!]
  update: [KudoUpdateWithWhereUniqueWithoutReceivedByInput!]
  upsert: [KudoUpsertWithWhereUniqueWithoutReceivedByInput!]
}

input KudoUpdateManyWithoutSentByInput {
  create: [KudoCreateWithoutSentByInput!]
  connect: [KudoWhereUniqueInput!]
  disconnect: [KudoWhereUniqueInput!]
  delete: [KudoWhereUniqueInput!]
  update: [KudoUpdateWithWhereUniqueWithoutSentByInput!]
  upsert: [KudoUpsertWithWhereUniqueWithoutSentByInput!]
}

input KudoUpdateWithoutReceivedByDataInput {
  message: String
  publish: Boolean
  sentBy: MemberUpdateOneRequiredWithoutKudosSentInput
  sentInConversation: ConversationUpdateOneRequiredInput
}

input KudoUpdateWithoutSentByDataInput {
  message: String
  publish: Boolean
  receivedBy: MemberUpdateOneRequiredWithoutKudosReceivedInput
  sentInConversation: ConversationUpdateOneRequiredInput
}

input KudoUpdateWithWhereUniqueWithoutReceivedByInput {
  where: KudoWhereUniqueInput!
  data: KudoUpdateWithoutReceivedByDataInput!
}

input KudoUpdateWithWhereUniqueWithoutSentByInput {
  where: KudoWhereUniqueInput!
  data: KudoUpdateWithoutSentByDataInput!
}

input KudoUpsertWithWhereUniqueWithoutReceivedByInput {
  where: KudoWhereUniqueInput!
  update: KudoUpdateWithoutReceivedByDataInput!
  create: KudoCreateWithoutReceivedByInput!
}

input KudoUpsertWithWhereUniqueWithoutSentByInput {
  where: KudoWhereUniqueInput!
  update: KudoUpdateWithoutSentByDataInput!
  create: KudoCreateWithoutSentByInput!
}

input KudoWhereInput {
  """Logical AND on all given filters."""
  AND: [KudoWhereInput!]

  """Logical OR on all given filters."""
  OR: [KudoWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [KudoWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime

  """All values that are not equal to given value."""
  updatedAt_not: DateTime

  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]

  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]

  """All values less than the given value."""
  updatedAt_lt: DateTime

  """All values less than or equal the given value."""
  updatedAt_lte: DateTime

  """All values greater than the given value."""
  updatedAt_gt: DateTime

  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  message: String

  """All values that are not equal to given value."""
  message_not: String

  """All values that are contained in given list."""
  message_in: [String!]

  """All values that are not contained in given list."""
  message_not_in: [String!]

  """All values less than the given value."""
  message_lt: String

  """All values less than or equal the given value."""
  message_lte: String

  """All values greater than the given value."""
  message_gt: String

  """All values greater than or equal the given value."""
  message_gte: String

  """All values containing the given string."""
  message_contains: String

  """All values not containing the given string."""
  message_not_contains: String

  """All values starting with the given string."""
  message_starts_with: String

  """All values not starting with the given string."""
  message_not_starts_with: String

  """All values ending with the given string."""
  message_ends_with: String

  """All values not ending with the given string."""
  message_not_ends_with: String
  publish: Boolean

  """All values that are not equal to given value."""
  publish_not: Boolean
  sentBy: MemberWhereInput
  receivedBy: MemberWhereInput
  sentInConversation: ConversationWhereInput
}

input KudoWhereUniqueInput {
  id: ID
}

"""
The \`Long\` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

type Member implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  slackId: String!
  kudosSent(where: KudoWhereInput, orderBy: KudoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Kudo!]
  kudosReceived(where: KudoWhereInput, orderBy: KudoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Kudo!]
  receiveNotifications: Boolean!
}

"""A connection to a list of items."""
type MemberConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [MemberEdge]!
  aggregate: AggregateMember!
}

input MemberCreateInput {
  slackId: String!
  receiveNotifications: Boolean
  kudosSent: KudoCreateManyWithoutSentByInput
  kudosReceived: KudoCreateManyWithoutReceivedByInput
}

input MemberCreateOneWithoutKudosReceivedInput {
  create: MemberCreateWithoutKudosReceivedInput
  connect: MemberWhereUniqueInput
}

input MemberCreateOneWithoutKudosSentInput {
  create: MemberCreateWithoutKudosSentInput
  connect: MemberWhereUniqueInput
}

input MemberCreateWithoutKudosReceivedInput {
  slackId: String!
  receiveNotifications: Boolean
  kudosSent: KudoCreateManyWithoutSentByInput
}

input MemberCreateWithoutKudosSentInput {
  slackId: String!
  receiveNotifications: Boolean
  kudosReceived: KudoCreateManyWithoutReceivedByInput
}

"""An edge in a connection."""
type MemberEdge {
  """The item at the end of the edge."""
  node: Member!

  """A cursor for use in pagination."""
  cursor: String!
}

enum MemberOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  slackId_ASC
  slackId_DESC
  receiveNotifications_ASC
  receiveNotifications_DESC
}

type MemberPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  slackId: String!
  receiveNotifications: Boolean!
}

type MemberSubscriptionPayload {
  mutation: MutationType!
  node: Member
  updatedFields: [String!]
  previousValues: MemberPreviousValues
}

input MemberSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [MemberSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [MemberSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [MemberSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: MemberWhereInput
}

input MemberUpdateInput {
  slackId: String
  receiveNotifications: Boolean
  kudosSent: KudoUpdateManyWithoutSentByInput
  kudosReceived: KudoUpdateManyWithoutReceivedByInput
}

input MemberUpdateOneRequiredWithoutKudosReceivedInput {
  create: MemberCreateWithoutKudosReceivedInput
  connect: MemberWhereUniqueInput
  update: MemberUpdateWithoutKudosReceivedDataInput
  upsert: MemberUpsertWithoutKudosReceivedInput
}

input MemberUpdateOneRequiredWithoutKudosSentInput {
  create: MemberCreateWithoutKudosSentInput
  connect: MemberWhereUniqueInput
  update: MemberUpdateWithoutKudosSentDataInput
  upsert: MemberUpsertWithoutKudosSentInput
}

input MemberUpdateWithoutKudosReceivedDataInput {
  slackId: String
  receiveNotifications: Boolean
  kudosSent: KudoUpdateManyWithoutSentByInput
}

input MemberUpdateWithoutKudosSentDataInput {
  slackId: String
  receiveNotifications: Boolean
  kudosReceived: KudoUpdateManyWithoutReceivedByInput
}

input MemberUpsertWithoutKudosReceivedInput {
  update: MemberUpdateWithoutKudosReceivedDataInput!
  create: MemberCreateWithoutKudosReceivedInput!
}

input MemberUpsertWithoutKudosSentInput {
  update: MemberUpdateWithoutKudosSentDataInput!
  create: MemberCreateWithoutKudosSentInput!
}

input MemberWhereInput {
  """Logical AND on all given filters."""
  AND: [MemberWhereInput!]

  """Logical OR on all given filters."""
  OR: [MemberWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [MemberWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime

  """All values that are not equal to given value."""
  updatedAt_not: DateTime

  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]

  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]

  """All values less than the given value."""
  updatedAt_lt: DateTime

  """All values less than or equal the given value."""
  updatedAt_lte: DateTime

  """All values greater than the given value."""
  updatedAt_gt: DateTime

  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  slackId: String

  """All values that are not equal to given value."""
  slackId_not: String

  """All values that are contained in given list."""
  slackId_in: [String!]

  """All values that are not contained in given list."""
  slackId_not_in: [String!]

  """All values less than the given value."""
  slackId_lt: String

  """All values less than or equal the given value."""
  slackId_lte: String

  """All values greater than the given value."""
  slackId_gt: String

  """All values greater than or equal the given value."""
  slackId_gte: String

  """All values containing the given string."""
  slackId_contains: String

  """All values not containing the given string."""
  slackId_not_contains: String

  """All values starting with the given string."""
  slackId_starts_with: String

  """All values not starting with the given string."""
  slackId_not_starts_with: String

  """All values ending with the given string."""
  slackId_ends_with: String

  """All values not ending with the given string."""
  slackId_not_ends_with: String
  receiveNotifications: Boolean

  """All values that are not equal to given value."""
  receiveNotifications_not: Boolean
  kudosSent_every: KudoWhereInput
  kudosSent_some: KudoWhereInput
  kudosSent_none: KudoWhereInput
  kudosReceived_every: KudoWhereInput
  kudosReceived_some: KudoWhereInput
  kudosReceived_none: KudoWhereInput
}

input MemberWhereUniqueInput {
  id: ID
  slackId: String
}

type Mutation {
  createMember(data: MemberCreateInput!): Member!
  createKudo(data: KudoCreateInput!): Kudo!
  createConversation(data: ConversationCreateInput!): Conversation!
  updateMember(data: MemberUpdateInput!, where: MemberWhereUniqueInput!): Member
  updateKudo(data: KudoUpdateInput!, where: KudoWhereUniqueInput!): Kudo
  updateConversation(data: ConversationUpdateInput!, where: ConversationWhereUniqueInput!): Conversation
  deleteMember(where: MemberWhereUniqueInput!): Member
  deleteKudo(where: KudoWhereUniqueInput!): Kudo
  deleteConversation(where: ConversationWhereUniqueInput!): Conversation
  upsertMember(where: MemberWhereUniqueInput!, create: MemberCreateInput!, update: MemberUpdateInput!): Member!
  upsertKudo(where: KudoWhereUniqueInput!, create: KudoCreateInput!, update: KudoUpdateInput!): Kudo!
  upsertConversation(where: ConversationWhereUniqueInput!, create: ConversationCreateInput!, update: ConversationUpdateInput!): Conversation!
  updateManyMembers(data: MemberUpdateInput!, where: MemberWhereInput): BatchPayload!
  updateManyKudoes(data: KudoUpdateInput!, where: KudoWhereInput): BatchPayload!
  updateManyConversations(data: ConversationUpdateInput!, where: ConversationWhereInput): BatchPayload!
  deleteManyMembers(where: MemberWhereInput): BatchPayload!
  deleteManyKudoes(where: KudoWhereInput): BatchPayload!
  deleteManyConversations(where: ConversationWhereInput): BatchPayload!
  executeRaw(database: PrismaDatabase, query: String!): Json!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

"""An object with an ID"""
interface Node {
  """The id of the object."""
  id: ID!
}

"""Information about pagination in a connection."""
type PageInfo {
  """When paginating forwards, are there more items?"""
  hasNextPage: Boolean!

  """When paginating backwards, are there more items?"""
  hasPreviousPage: Boolean!

  """When paginating backwards, the cursor to continue."""
  startCursor: String

  """When paginating forwards, the cursor to continue."""
  endCursor: String
}

enum PrismaDatabase {
  default
}

type Query {
  members(where: MemberWhereInput, orderBy: MemberOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Member]!
  kudoes(where: KudoWhereInput, orderBy: KudoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Kudo]!
  conversations(where: ConversationWhereInput, orderBy: ConversationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Conversation]!
  member(where: MemberWhereUniqueInput!): Member
  kudo(where: KudoWhereUniqueInput!): Kudo
  conversation(where: ConversationWhereUniqueInput!): Conversation
  membersConnection(where: MemberWhereInput, orderBy: MemberOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): MemberConnection!
  kudoesConnection(where: KudoWhereInput, orderBy: KudoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): KudoConnection!
  conversationsConnection(where: ConversationWhereInput, orderBy: ConversationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ConversationConnection!

  """Fetches an object given its ID"""
  node(
    """The ID of an object"""
    id: ID!
  ): Node
}

type Subscription {
  member(where: MemberSubscriptionWhereInput): MemberSubscriptionPayload
  kudo(where: KudoSubscriptionWhereInput): KudoSubscriptionPayload
  conversation(where: ConversationSubscriptionWhereInput): ConversationSubscriptionPayload
}
`

export const Prisma = makePrismaBindingClass<BindingConstructor<Prisma>>({typeDefs})

/**
 * Types
*/

export type MemberOrderByInput =   'id_ASC' |
  'id_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'slackId_ASC' |
  'slackId_DESC' |
  'receiveNotifications_ASC' |
  'receiveNotifications_DESC'

export type KudoOrderByInput =   'id_ASC' |
  'id_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'message_ASC' |
  'message_DESC' |
  'publish_ASC' |
  'publish_DESC'

export type ConversationOrderByInput =   'id_ASC' |
  'id_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'slackId_ASC' |
  'slackId_DESC' |
  'organiseCompetition_ASC' |
  'organiseCompetition_DESC' |
  'sendEngagementMessages_ASC' |
  'sendEngagementMessages_DESC'

export type PrismaDatabase =   'default'

export type MutationType =   'CREATED' |
  'UPDATED' |
  'DELETED'

export interface MemberCreateOneWithoutKudosSentInput {
  create?: MemberCreateWithoutKudosSentInput
  connect?: MemberWhereUniqueInput
}

export interface MemberWhereInput {
  AND?: MemberWhereInput[] | MemberWhereInput
  OR?: MemberWhereInput[] | MemberWhereInput
  NOT?: MemberWhereInput[] | MemberWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  slackId?: String
  slackId_not?: String
  slackId_in?: String[] | String
  slackId_not_in?: String[] | String
  slackId_lt?: String
  slackId_lte?: String
  slackId_gt?: String
  slackId_gte?: String
  slackId_contains?: String
  slackId_not_contains?: String
  slackId_starts_with?: String
  slackId_not_starts_with?: String
  slackId_ends_with?: String
  slackId_not_ends_with?: String
  receiveNotifications?: Boolean
  receiveNotifications_not?: Boolean
  kudosSent_every?: KudoWhereInput
  kudosSent_some?: KudoWhereInput
  kudosSent_none?: KudoWhereInput
  kudosReceived_every?: KudoWhereInput
  kudosReceived_some?: KudoWhereInput
  kudosReceived_none?: KudoWhereInput
}

export interface MemberUpdateInput {
  slackId?: String
  receiveNotifications?: Boolean
  kudosSent?: KudoUpdateManyWithoutSentByInput
  kudosReceived?: KudoUpdateManyWithoutReceivedByInput
}

export interface ConversationWhereInput {
  AND?: ConversationWhereInput[] | ConversationWhereInput
  OR?: ConversationWhereInput[] | ConversationWhereInput
  NOT?: ConversationWhereInput[] | ConversationWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  slackId?: String
  slackId_not?: String
  slackId_in?: String[] | String
  slackId_not_in?: String[] | String
  slackId_lt?: String
  slackId_lte?: String
  slackId_gt?: String
  slackId_gte?: String
  slackId_contains?: String
  slackId_not_contains?: String
  slackId_starts_with?: String
  slackId_not_starts_with?: String
  slackId_ends_with?: String
  slackId_not_ends_with?: String
  organiseCompetition?: Boolean
  organiseCompetition_not?: Boolean
  sendEngagementMessages?: Boolean
  sendEngagementMessages_not?: Boolean
}

export interface KudoCreateManyWithoutSentByInput {
  create?: KudoCreateWithoutSentByInput[] | KudoCreateWithoutSentByInput
  connect?: KudoWhereUniqueInput[] | KudoWhereUniqueInput
}

export interface ConversationUpdateOneRequiredInput {
  create?: ConversationCreateInput
  connect?: ConversationWhereUniqueInput
  update?: ConversationUpdateDataInput
  upsert?: ConversationUpsertNestedInput
}

export interface KudoCreateWithoutSentByInput {
  message?: String
  publish: Boolean
  receivedBy: MemberCreateOneWithoutKudosReceivedInput
  sentInConversation: ConversationCreateOneInput
}

export interface KudoUpdateManyWithoutSentByInput {
  create?: KudoCreateWithoutSentByInput[] | KudoCreateWithoutSentByInput
  connect?: KudoWhereUniqueInput[] | KudoWhereUniqueInput
  disconnect?: KudoWhereUniqueInput[] | KudoWhereUniqueInput
  delete?: KudoWhereUniqueInput[] | KudoWhereUniqueInput
  update?: KudoUpdateWithWhereUniqueWithoutSentByInput[] | KudoUpdateWithWhereUniqueWithoutSentByInput
  upsert?: KudoUpsertWithWhereUniqueWithoutSentByInput[] | KudoUpsertWithWhereUniqueWithoutSentByInput
}

export interface MemberCreateOneWithoutKudosReceivedInput {
  create?: MemberCreateWithoutKudosReceivedInput
  connect?: MemberWhereUniqueInput
}

export interface ConversationSubscriptionWhereInput {
  AND?: ConversationSubscriptionWhereInput[] | ConversationSubscriptionWhereInput
  OR?: ConversationSubscriptionWhereInput[] | ConversationSubscriptionWhereInput
  NOT?: ConversationSubscriptionWhereInput[] | ConversationSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: ConversationWhereInput
}

export interface MemberCreateWithoutKudosReceivedInput {
  slackId: String
  receiveNotifications?: Boolean
  kudosSent?: KudoCreateManyWithoutSentByInput
}

export interface MemberSubscriptionWhereInput {
  AND?: MemberSubscriptionWhereInput[] | MemberSubscriptionWhereInput
  OR?: MemberSubscriptionWhereInput[] | MemberSubscriptionWhereInput
  NOT?: MemberSubscriptionWhereInput[] | MemberSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: MemberWhereInput
}

export interface ConversationCreateOneInput {
  create?: ConversationCreateInput
  connect?: ConversationWhereUniqueInput
}

export interface KudoWhereUniqueInput {
  id?: ID_Input
}

export interface ConversationCreateInput {
  slackId: String
  organiseCompetition?: Boolean
  sendEngagementMessages?: Boolean
}

export interface ConversationUpdateInput {
  slackId?: String
  organiseCompetition?: Boolean
  sendEngagementMessages?: Boolean
}

export interface KudoCreateManyWithoutReceivedByInput {
  create?: KudoCreateWithoutReceivedByInput[] | KudoCreateWithoutReceivedByInput
  connect?: KudoWhereUniqueInput[] | KudoWhereUniqueInput
}

export interface KudoUpsertWithWhereUniqueWithoutReceivedByInput {
  where: KudoWhereUniqueInput
  update: KudoUpdateWithoutReceivedByDataInput
  create: KudoCreateWithoutReceivedByInput
}

export interface KudoCreateWithoutReceivedByInput {
  message?: String
  publish: Boolean
  sentBy: MemberCreateOneWithoutKudosSentInput
  sentInConversation: ConversationCreateOneInput
}

export interface MemberUpdateWithoutKudosSentDataInput {
  slackId?: String
  receiveNotifications?: Boolean
  kudosReceived?: KudoUpdateManyWithoutReceivedByInput
}

export interface ConversationUpsertNestedInput {
  update: ConversationUpdateDataInput
  create: ConversationCreateInput
}

export interface KudoUpdateWithoutReceivedByDataInput {
  message?: String
  publish?: Boolean
  sentBy?: MemberUpdateOneRequiredWithoutKudosSentInput
  sentInConversation?: ConversationUpdateOneRequiredInput
}

export interface MemberCreateWithoutKudosSentInput {
  slackId: String
  receiveNotifications?: Boolean
  kudosReceived?: KudoCreateManyWithoutReceivedByInput
}

export interface KudoUpdateManyWithoutReceivedByInput {
  create?: KudoCreateWithoutReceivedByInput[] | KudoCreateWithoutReceivedByInput
  connect?: KudoWhereUniqueInput[] | KudoWhereUniqueInput
  disconnect?: KudoWhereUniqueInput[] | KudoWhereUniqueInput
  delete?: KudoWhereUniqueInput[] | KudoWhereUniqueInput
  update?: KudoUpdateWithWhereUniqueWithoutReceivedByInput[] | KudoUpdateWithWhereUniqueWithoutReceivedByInput
  upsert?: KudoUpsertWithWhereUniqueWithoutReceivedByInput[] | KudoUpsertWithWhereUniqueWithoutReceivedByInput
}

export interface KudoCreateInput {
  message?: String
  publish: Boolean
  sentBy: MemberCreateOneWithoutKudosSentInput
  receivedBy: MemberCreateOneWithoutKudosReceivedInput
  sentInConversation: ConversationCreateOneInput
}

export interface MemberCreateInput {
  slackId: String
  receiveNotifications?: Boolean
  kudosSent?: KudoCreateManyWithoutSentByInput
  kudosReceived?: KudoCreateManyWithoutReceivedByInput
}

export interface ConversationUpdateDataInput {
  slackId?: String
  organiseCompetition?: Boolean
  sendEngagementMessages?: Boolean
}

export interface KudoSubscriptionWhereInput {
  AND?: KudoSubscriptionWhereInput[] | KudoSubscriptionWhereInput
  OR?: KudoSubscriptionWhereInput[] | KudoSubscriptionWhereInput
  NOT?: KudoSubscriptionWhereInput[] | KudoSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: KudoWhereInput
}

export interface ConversationWhereUniqueInput {
  id?: ID_Input
  slackId?: String
}

export interface MemberUpsertWithoutKudosSentInput {
  update: MemberUpdateWithoutKudosSentDataInput
  create: MemberCreateWithoutKudosSentInput
}

export interface KudoUpdateWithWhereUniqueWithoutSentByInput {
  where: KudoWhereUniqueInput
  data: KudoUpdateWithoutSentByDataInput
}

export interface KudoUpdateWithWhereUniqueWithoutReceivedByInput {
  where: KudoWhereUniqueInput
  data: KudoUpdateWithoutReceivedByDataInput
}

export interface MemberUpsertWithoutKudosReceivedInput {
  update: MemberUpdateWithoutKudosReceivedDataInput
  create: MemberCreateWithoutKudosReceivedInput
}

export interface MemberUpdateWithoutKudosReceivedDataInput {
  slackId?: String
  receiveNotifications?: Boolean
  kudosSent?: KudoUpdateManyWithoutSentByInput
}

export interface MemberUpdateOneRequiredWithoutKudosReceivedInput {
  create?: MemberCreateWithoutKudosReceivedInput
  connect?: MemberWhereUniqueInput
  update?: MemberUpdateWithoutKudosReceivedDataInput
  upsert?: MemberUpsertWithoutKudosReceivedInput
}

export interface KudoUpdateWithoutSentByDataInput {
  message?: String
  publish?: Boolean
  receivedBy?: MemberUpdateOneRequiredWithoutKudosReceivedInput
  sentInConversation?: ConversationUpdateOneRequiredInput
}

export interface KudoUpsertWithWhereUniqueWithoutSentByInput {
  where: KudoWhereUniqueInput
  update: KudoUpdateWithoutSentByDataInput
  create: KudoCreateWithoutSentByInput
}

export interface MemberUpdateOneRequiredWithoutKudosSentInput {
  create?: MemberCreateWithoutKudosSentInput
  connect?: MemberWhereUniqueInput
  update?: MemberUpdateWithoutKudosSentDataInput
  upsert?: MemberUpsertWithoutKudosSentInput
}

export interface KudoUpdateInput {
  message?: String
  publish?: Boolean
  sentBy?: MemberUpdateOneRequiredWithoutKudosSentInput
  receivedBy?: MemberUpdateOneRequiredWithoutKudosReceivedInput
  sentInConversation?: ConversationUpdateOneRequiredInput
}

export interface MemberWhereUniqueInput {
  id?: ID_Input
  slackId?: String
}

export interface KudoWhereInput {
  AND?: KudoWhereInput[] | KudoWhereInput
  OR?: KudoWhereInput[] | KudoWhereInput
  NOT?: KudoWhereInput[] | KudoWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  message?: String
  message_not?: String
  message_in?: String[] | String
  message_not_in?: String[] | String
  message_lt?: String
  message_lte?: String
  message_gt?: String
  message_gte?: String
  message_contains?: String
  message_not_contains?: String
  message_starts_with?: String
  message_not_starts_with?: String
  message_ends_with?: String
  message_not_ends_with?: String
  publish?: Boolean
  publish_not?: Boolean
  sentBy?: MemberWhereInput
  receivedBy?: MemberWhereInput
  sentInConversation?: ConversationWhereInput
}

/*
 * An object with an ID

 */
export interface Node {
  id: ID_Output
}

export interface ConversationPreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  slackId: String
  organiseCompetition: Boolean
  sendEngagementMessages: Boolean
}

/*
 * Information about pagination in a connection.

 */
export interface PageInfo {
  hasNextPage: Boolean
  hasPreviousPage: Boolean
  startCursor?: String
  endCursor?: String
}

export interface MemberPreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  slackId: String
  receiveNotifications: Boolean
}

/*
 * A connection to a list of items.

 */
export interface MemberConnection {
  pageInfo: PageInfo
  edges: MemberEdge[]
  aggregate: AggregateMember
}

export interface Member extends Node {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  slackId: String
  kudosSent?: Kudo[]
  kudosReceived?: Kudo[]
  receiveNotifications: Boolean
}

export interface BatchPayload {
  count: Long
}

/*
 * An edge in a connection.

 */
export interface ConversationEdge {
  node: Conversation
  cursor: String
}

export interface ConversationSubscriptionPayload {
  mutation: MutationType
  node?: Conversation
  updatedFields?: String[]
  previousValues?: ConversationPreviousValues
}

export interface AggregateKudo {
  count: Int
}

export interface Kudo extends Node {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  sentBy: Member
  receivedBy: Member
  sentInConversation: Conversation
  message?: String
  publish: Boolean
}

/*
 * A connection to a list of items.

 */
export interface KudoConnection {
  pageInfo: PageInfo
  edges: KudoEdge[]
  aggregate: AggregateKudo
}

/*
 * An edge in a connection.

 */
export interface MemberEdge {
  node: Member
  cursor: String
}

export interface MemberSubscriptionPayload {
  mutation: MutationType
  node?: Member
  updatedFields?: String[]
  previousValues?: MemberPreviousValues
}

export interface Conversation extends Node {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  slackId: String
  organiseCompetition: Boolean
  sendEngagementMessages: Boolean
}

export interface KudoSubscriptionPayload {
  mutation: MutationType
  node?: Kudo
  updatedFields?: String[]
  previousValues?: KudoPreviousValues
}

export interface KudoPreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  message?: String
  publish: Boolean
}

export interface AggregateConversation {
  count: Int
}

export interface AggregateMember {
  count: Int
}

/*
 * An edge in a connection.

 */
export interface KudoEdge {
  node: Kudo
  cursor: String
}

/*
 * A connection to a list of items.

 */
export interface ConversationConnection {
  pageInfo: PageInfo
  edges: ConversationEdge[]
  aggregate: AggregateConversation
}

/*
The `Long` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
export type Long = string

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string

/*
Raw JSON value
*/
export type Json = any

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

export type DateTime = Date | string