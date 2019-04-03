const { gql } = require('apollo-server');

const typeDefs = gql `
  type SimpleReview {

    "影评 id"
    id:String

    "影评名"
    title:String

    "影评 url"
    alt:String

    "条目 id"
    subject_id:String

    "上传用户，见附录"
    author:SimpleUser

    "影评评分，见附录"
    rating:CommentRating

    "摘要，100 字以内"
    summary:String
  
}
`
export default typeDefs
