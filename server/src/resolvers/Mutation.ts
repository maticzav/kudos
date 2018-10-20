import { Context } from '../utils'

export const Mutation = {
  async createWorkspace(parent, args, ctx: Context, info) {
    try {
      const conversations = await ctx.slack.getConversationList()

      const conversationPromises = conversations.map(async conversation => {
        return ctx.db.mutation.upsertConversation({
          where: {
            slackId: conversation.id,
          },
          create: {
            slackId: conversation.id,
            organiseCompetition: false,
            sendEngagementMessages: false,
          },
          update: {},
        })
      })

      await Promise.all(conversationPromises)

      return { success: true }
    } catch (err) {
      return { success: false }
    }
  },
  async createConversation(parent, { slackId, settings }, ctx: Context, info) {
    const conversation = await ctx.db.mutation.createConversation(
      {
        data: {
          slackId,
          organiseCompetition: settings.organiseCompetition,
          sendEngagementMessages: settings.sendEngagementMessages,
        },
      },
      info,
    )

    return conversation
  },
  async updateConversation(parent, { slackId, settings }, ctx: Context, info) {
    const conversation = await ctx.db.mutation.updateConversation(
      {
        where: {
          slackId,
        },
        data: {
          organiseCompetition: settings.organiseCompetition,
          sendEngagementMessages: settings.sendEngagementMessages,
        },
      },
      info,
    )

    return conversation
  },
  async deleteConversation(parent, { slackId }, ctx: Context, info) {
    const conversation = await ctx.db.mutation.deleteConversation(
      { where: { slackId } },
      info,
    )

    return conversation
  },
  async sendKudos(parent, { data }, ctx: Context, info) {
    const sender = await ctx.db.mutation.upsertMember({
      where: { slackId: data.senderSlackId },
      create: {
        slackId: data.senderSlackId,
      },
      update: {},
    })

    const receiver = await ctx.db.mutation.upsertMember({
      where: { slackId: data.recipientSlackId },
      create: {
        slackId: data.recipientSlackId,
      },
      update: {},
    })

    const kudo = await ctx.db.mutation.createKudo(
      {
        data: {
          sentBy: { connect: { id: sender.id } },
          receivedBy: { connect: { id: receiver.id } },
          sentInConversation: {
            connect: { slackId: data.conversationSlackId },
          },
          message: data.message,
          publish: false,
        },
      },
      info,
    )

    return kudo
  },
  async publishKudos(parent, { id }, ctx: Context, info) {
    const conversation = await ctx.db.mutation.updateKudo(
      {
        where: { id },
        data: { publish: true },
      },
      info,
    )

    return conversation
  },
}
