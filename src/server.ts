import * as Koa from 'koa'
import * as ApolloServer from 'apollo-server-koa'
import schema from './gql/index'
import auth from './plugin/auth'

class Server {
  public app: Koa

  constructor() {
    this.app = new Koa()
    this.routes()
  }

  private routes() {
    const server = new ApolloServer.ApolloServer({
      schema,
      context: async ({ ctx }) => {
        // console.log("TCL: Server -> privateroutes -> ctx", ctx)
        // 1. 取出
        const token = ctx.req.headers['x-token']
        if (token) {
          try {
            // 2. 檢查 token + 取得解析出的資料
            const me = await auth.verify(token)
            // 3. 放進 context
            return { me }
          } catch (e) {
            throw new Error('Your session expired. Sign in again.')
          }
        }
        // 如果沒有 token 就回傳空的 context 出去
        return {}
      },
      playground: true, // 开启开发UI调试工具,
      rootValue: {
        auth,
      },
    })

    server.applyMiddleware({ app: this.app })
  }
}

export default new Server().app
