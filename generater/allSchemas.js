const {
  gql
} = require('apollo-server');

const typeDefs = gql `
type SimpleCelebrity {

"影人条目 id"
id:String

"中文名"
name:String

"影人条目 URL"
alt:String

"影人头像，分别提供 420px x 600px(大)，140px x 200px(中) 70px x 100px(小)尺寸"
avatars:Images

}
type MovieSimplePhotos {

"图片 id"
id:String

"图片展示页 url"
alt:String

"图片地址，icon 尺寸"
icon:String

"图片地址，image 尺寸"
image:String

"图片地址，thumb 尺寸"
thumb:String

"图片地址，cover 尺寸"
cover:String

}
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

type CommentRating{
  "最低评分"
  min:Int

  "最高评分"
  max:Int

  "评分"
  value:Int
}

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

 type MovieRating {

"最低评分"
min:Int

"最高评分"
max:Int

# details:RatingDetail

"评分"
average:Float

"评星数"
stars:Int

}

# type RatingDetail {
#   "1" :String
# }

type Images {
  small:String

  medium:String

  large:String
}

type Movie {

"条目 id"
id:String

"中文名"
title:String

"原名"
original_title:String

"又名"
aka:[String!]

"条目页 URL"
alt:String

"移动版条目页 URL"
mobile_url:String

"评分，见附录"
rating:MovieRating

"评分人数"
ratings_count:Int

"想看人数"
wish_count:Int

"看过人数"
collect_count:Int

"在看人数，如果是电视剧，默认值为 0，如果是电影值为 null"
do_count:Int

"电影海报图，分别提供 288px x 465px(大)，96px x 155px(中) 64px x 103px(小)尺寸"
images:Images

"条目分类, movie 或者 tv"
subtype:String

"导演，数据结构为影人的简化描述，见附录"
directors:[SimpleCelebrity!]

"主演，最多可获得 4 个，数据结构为影人的简化描述，见附录"
casts:[SimpleCelebrity!]

"编剧，数据结构为影人的简化描述，见附录"
writers:[SimpleCelebrity!]

"官方网站"
website:String

"豆瓣小站"
douban_site:String

"如果条目类型是电影则为上映日期，如果是电视剧则为首 Ï 日期"
pubdates:[String!]

"大陆上映日期，如果条目类型是电影则为上映日期，如果是电视剧则为首播日期"
mainland_pubdate:String

"兼容性数据，未来会去掉，大陆上映日期，如果条目类型是电影则为上映日期，如果是电视剧则为首播日期"
pubdate:String

"年代"
year:String

"语言"
languages:[String!]

"片长"
durations:[String!]

"影片类型，最多提供 3 个"
genres:[String!]

"制片国家/地区"
countries:[String!]

"简介"
summary:String

"短评数量"
comments_count:Int

"影评数量"
reviews_count:Int

"总季数(tv only)"
seasons_count:Int

"当前季数(tv only)"
current_season:Int

"当前季的集数(tv only)"
episodes_count:Int

"影讯页 URL(movie only)"
schedule_url:String

"预告片 URL，对高级用户以上开放，最多开放 4 个地址"
trailer_urls:[String]

"片段 URL，对高级用户以上开放，最多开放 4 个地址"
clip_urls:[String]


"花絮 URL，对高级用户以上开放，最多开放 4 个地址"
blooper_urls:[String]

"电影剧照，前 10 张，见附录"
photos:[MovieSimplePhotos!]

"热门影评"
popular_comments:[Comment!]

"影评，前 10 条，影评结构，见附录"
popular_reviews:[SimpleReview!]

}
extend type Query {
    "A simple type for getting started!"
    movie(id:String!): Movie
  }
`
export default typeDefs