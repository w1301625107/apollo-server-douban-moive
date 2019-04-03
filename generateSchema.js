const {
  promisify
} = require('util')
const originInfo = require('./originInfo')
const fs = require('fs')

const writeFile = promisify(fs.writeFile)

const cutS = 129
const cutE = 132
const schemaName = "SimpleCelebrity"

const firstLetterToLowerCase = str => str.charAt(0).toLowerCase() + str.slice(1)


let data = `const { gql } = require('apollo-server');

const typeDefs = gql \`
  type ${schemaName} {
`
for (let i = cutS; i <= cutE; i++) {
  data += `
    "${originInfo.descs[i]}"
    ${originInfo.props[i]}:${originInfo.types[i]}
  `
}
data += `
}
\`
export default typeDefs
`

writeFile(`./schema/${firstLetterToLowerCase(schemaName)}.js`, data)
  .then(console.log('done'))