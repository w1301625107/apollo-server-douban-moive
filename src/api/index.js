const axios = require('axios')

const me = 'https://api.douban.com'
const other = 'https://douban.uieee.com'

const proxy = false

const baseUrl = proxy ? other : me

export async function getMovie(id) {
  console.log('fetch')

  let data = await axios.get(`${baseUrl}/v2/movie/subject/${id}`)
  // console.log("TCL: getMovie -> data", data)
  console.log('fetch')
  return data.data
}
