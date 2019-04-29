import * as Koa from 'koa'
import * as ApolloServer from 'apollo-server-koa'
import schema from './gql/index'

class Server {
  public app: Koa

  constructor() {
    this.app = new Koa()
    this.routes()
  }

  private routes() {
    const server = new ApolloServer.ApolloServer({
      schema,
      playground: true, // 开启开发UI调试工具
    })

    server.applyMiddleware({ app: this.app })
  }
}

export default new Server().app
