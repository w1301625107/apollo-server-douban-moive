import {
  makeExecutableSchema
} from 'graphql-tools';
const {
  ApolloServer,
  gql
} = require('apollo-server');
import {getMovie} from './api/index'

import typeDefs from './schema/index'

//A map of functions which return data for the schema.
const resolvers = {
  Query: {
    movie: (root, {
      id
    }) => getMovie(id),
  },
};


const schema = makeExecutableSchema({
  typeDefs: [...typeDefs],
  resolvers: resolvers
});

const server = new ApolloServer({
  schema
});

server.listen().then(({
  url
}) => {
  console.log(`🚀 Server ready at ${url}`);
});