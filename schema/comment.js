const { gql } = require('apollo-server');

const typeDefs = gql `
  type Comment {

    "短评 id"
    id:String

    "发布日期"
    created_at:String

    "条目 id"
    subject_id:String

    "上传用户，见附录"
    author:SimpleUser

    "短评内容，140 字以内"
    content:String

    "短评评分，见附录"
    rating:CommentRating

    "有用数"
    useful_count:Int
  
}
`
export default typeDefs
