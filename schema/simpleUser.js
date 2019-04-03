const { gql } = require('apollo-server');

const typeDefs = gql `
  type SimpleUser {

    "用户 id"
    id:String

    "用户名"
    name:String

    "用户唯一标识"
    uid:String

    "用户签名"
    signature:String

    "用户个人主页 url"
    alt:String

    "用户头像"
    avatar:String
  
}
`
export default typeDefs
