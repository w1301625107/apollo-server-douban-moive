import typeDefs from './allSchemas'
const {
  ApolloServer,
  gql
} = require('apollo-server');
const axios = require('axios')

const me = 'https://api.douban.com'
const other = 'https://douban.uieee.com'

const proxy = false;

const baseUrl = proxy ? other : me

async function getMovie(id) {
  let data = await axios.get(`${baseUrl}/v2/movie/subject/${id}`)
  // console.log("TCL: getMovie -> data", data)
  console.log('fetched')
  return data.data
}


// The GraphQL schema
// const typeDefs = gql`
//   # type Movie {

//   # }
//   type Query {
//     "A simple type for getting started!"
//     hello: String
//   }
// `;

//A map of functions which return data for the schema.
const resolvers = {
  Query: {
    movie: (root, { id }) => getMovie(id),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({
  url
}) => {
  console.log(`🚀 Server ready at ${url}`);
});