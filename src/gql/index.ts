import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from './schema/index'
import resolvers from './resolvers'
console.log('TCL: resolvers', resolvers)

export default makeExecutableSchema({
  typeDefs: [...typeDefs],
  resolvers,
})
