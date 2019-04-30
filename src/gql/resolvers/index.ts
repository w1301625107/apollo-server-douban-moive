import { resolve } from 'path'

import * as glob from 'glob'

const resolves = {
  Query: {},
  Mutation: {},
}

glob
  .sync(resolve(__dirname, '', '**/*.ts'), { ignore: ['**/index.ts'] })
  .forEach(path => {
    const item = require(path).default
    resolves.Query = { ...resolves.Query, ...item.Query }
    resolves.Mutation = { ...resolves.Mutation, ...item.Mutation }
  })

export default resolves
