import * as Graphql from 'graphql'
import * as Language from 'graphql/language'

const resolvers = {
  Date: new Graphql.GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
      // value sent to the client
      // 輸出到前端
      return value.getTime()
    },
    parseValue(value) {
      // value from the client (variables)
      // 從前端 variables 進來的 input
      return new Date(value)
    },
    parseLiteral(ast) {
      // value from the client (inline)
      // 從前端 inline variables 進來的 input
      if (ast.kind === Language.Kind.INT) {
        return new Date(parseInt(ast.value, 10)) // ast value is always in string format
      }
      return null
    },
  }),
  Query: {
    now: () => new Date(),
    isFriday: (root, { date }) => date.getDay() === 5,
  },
}

export default resolvers
