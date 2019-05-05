import { getMovieById, getTop250 } from '../../model/movie'
import * as ApolloServer from 'apollo-server-koa'

const UserInputError = ApolloServer.UserInputError

//A map of functions which return data for the schema.
const resolvers = {
  Query: {
    movie: (root, { id }) => getMovieById(id),
    moviesTop250: async (root, { first, after, last, before }) => {
      if (!first && after) throw new UserInputError('after must be with first')
      if ((last && !before) || (!last && before))
        throw new UserInputError('last and before must be used together')
      if (first && after && last && before)
        throw new UserInputError('Incorrect Arguments Usage.')

      const { data: movies, from, to, allCount } = getTop250(
        first,
        after,
        last,
        before,
      )

      return {
        edges: movies.map(movie => ({
          // 指標 (將 createdAt 做 base64)
          cursor: Buffer.from(movie.id).toString('base64'),
          // 實際資料
          node: movie,
        })),
        pageInfo: {
          startCursor: Buffer.from(movies[0].id).toString('base64'),
          endCursor: Buffer.from(movies[movies.length - 1].id).toString(
            'base64',
          ),
          // 檢查有無下一頁
          hasNextPage: to < allCount,
          // 檢查有無上一頁
          hasPreviousPage: from > 0,
          // 總頁數
          totalPageCount: Math.ceil(allCount / (first || last)),
        },
      }
    },
  },
}

export default resolvers
