import { Context } from '../utils'

export const Query = {
  async channelLeaderboard(parent, args, ctx: Context, info) {
    const foo = await ctx.db.query.kudoesConnection(
      {
        where: {},
      },
      ` { aggregate { count } } `,
    )

    foo.aggregate.count
  },
}
