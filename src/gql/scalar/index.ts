import resolves from './scalar'
import fs = require('fs')
import { resolve } from 'path'

const typeDefs = []

const content = fs.readFileSync(resolve(__dirname, '', './scalar.graphql'), {
  encoding: 'utf-8',
})
typeDefs.push(content)

export default {
  typeDefs,
  resolves,
}
