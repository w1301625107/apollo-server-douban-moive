import { resolve } from 'path'

import * as glob from 'glob'

const resolves = {
  directive_typeDefs: [],
  schemaDirectives: {},
}

glob
  .sync(resolve(__dirname, '', '**/*.ts'), { ignore: ['**/index.ts'] })
  .forEach(path => {
    const item = require(path).default
    resolves.directive_typeDefs.push(item.def)
    resolves.schemaDirectives = {
      ...resolves.schemaDirectives,
      ...item.directives,
    }
  })

export default resolves
