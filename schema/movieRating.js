const { gql } = require('apollo-server');

const typeDefs = gql `
  type Rating {

    "最低评分"
    min:Int
  
    "最高评分"
    max:Int

    details:RatingDetail
  
    "评分"
    average:Float
  
    "评星数"
    stars:Int
  
}

type RatingDetail{
  "1" : String
}
`
export default typeDefs
