import { getMovie } from '../../api/index'
import top250 from '../../fake_data/top250'
import * as ApolloServer from 'apollo-server-koa'

const UserInputError = ApolloServer.UserInputError

//A map of functions which return data for the schema.
const resolvers = {
  Query: {
    movie: (root, { id }) => getMovie(id),
    moviesTop250: async (root, { first, after, last, before }) => {
      if (!first && after) throw new UserInputError('after must be with first')
      if ((last && !before) || (!last && before))
        throw new UserInputError('last and before must be used together')
      if (first && after && last && before)
        throw new UserInputError('Incorrect Arguments Usage.')

      let movies: any[]
      let from: number = 0
      let to: number = 0
      // 取得下一頁資料
      if (first) {
        if (after) {
          from =
            top250.findIndex(
              i => i.id == new Buffer(after, 'base64').toString(),
            ) + 1
          to = from + first
        } else {
          from = 0
          to = first
        }
      }

      // 或是取得上一頁資料
      if (last) {
        to = top250.findIndex(
          i => i.id == new Buffer(before, 'base64').toString(),
        )
        from = last - to
      }

      movies = top250.slice(from, to)

      // 取得總數量
      const allCount = top250.length

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
