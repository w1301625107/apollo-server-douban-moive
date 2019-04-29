import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from './schema/index'
import resolvers from './resolvers'

export default makeExecutableSchema({
  typeDefs: [...typeDefs],
  resolvers: resolvers,
})
