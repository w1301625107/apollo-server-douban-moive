import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from './schema/index'
import resolvers from './resolvers'
import directives from './directives'

export default makeExecutableSchema({
  typeDefs: [...directives.directive_typeDefs, ...typeDefs],
  resolvers,
  schemaDirectives: directives.schemaDirectives,
})
