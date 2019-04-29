import { resolve } from 'path'

const fs = require('fs')

import * as glob from 'glob'

const typeDefs = []

glob.sync(resolve(__dirname, '', '**/*.{graphql,gql}')).forEach(path => {
  const content = fs.readFileSync(path, {
    encoding: 'utf-8',
  })
  typeDefs.push(content)
})

export default typeDefs
