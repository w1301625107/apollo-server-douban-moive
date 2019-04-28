import movieResolvers from './movie'

//graphql resolve
export default {
  Query: {
    ...movieResolvers,
  },
}
