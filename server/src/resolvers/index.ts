export const resolvers = {
  Query: {
    hello: (parent, args, ctx, info) => {
      return 'hey'
    },
  },
}

export const fragmentReplacements = []
