const { gql } = require('apollo-server');

const typeDefs = gql `
  type Images {
    small:String

    medium:String

    large:String
  }
`
export default typeDefs
