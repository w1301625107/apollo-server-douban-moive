const axios = require('axios')

const me = 'https://api.douban.com'
const other = 'https://douban.uieee.com'

const proxy = false

const baseUrl = proxy ? other : me

export async function getMovie(id) {
  let data = await axios.get(`${baseUrl}/v2/movie/subject/${id}`)
  console.log('fetched')
  return data.data
}
