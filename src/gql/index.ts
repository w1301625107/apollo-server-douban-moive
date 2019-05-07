import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from './schema/index'
import resolvers from './resolvers'
import directives from './directives'
import scalars from './scalar'
import { mergeResolvers } from './tool'

export default makeExecutableSchema({
  typeDefs: [
    ...directives.directive_typeDefs,
    ...typeDefs,
    ...scalars.typeDefs,
  ],
  resolvers: mergeResolvers(resolvers, scalars.resolves),
  schemaDirectives: directives.schemaDirectives,
})
