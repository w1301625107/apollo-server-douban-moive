import { makeExecutableSchema } from 'graphql-tools'
import * as Koa from 'koa'
const { ApolloServer, gql } = require('apollo-server-koa')
import { getMovie } from '../api/index'

import typeDefs from '../schema/index'

//A map of functions which return data for the schema.
const resolvers = {
  Query: {
    movie: (root, { id }) => getMovie(id),
  },
}

const schema = makeExecutableSchema({
  typeDefs: [...typeDefs],
  resolvers: resolvers,
})

class Server {
  public app: Koa

  constructor() {
    this.app = new Koa()
    this.routes()
  }

  private routes() {
    const server = new ApolloServer({
      schema,
      playground: true, // 开启开发UI调试工具
    })

    server.applyMiddleware({ app: this.app })
  }
}

export default new Server().app
