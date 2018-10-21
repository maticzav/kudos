import { Context } from '../utils'

export const Query = {
  channelLeaderboard(parent, args, ctx: Context, info) {
    return args
  },
  competingConversations(parent, args, ctx: Context, info) {
    return ctx.db.query.conversations(
      { where: { organiseCompetition: true } },
      info,
    )
  },
  engagedConversations(parent, args, ctx: Context, info) {
    return ctx.db.query.conversations(
      { where: { sendEngagementMessages: true } },
      info,
    )
  },
  kudo(parent, { id }, ctx: Context, info) {
    return ctx.db.query.kudo({ where: { id } }, info)
  },
}
