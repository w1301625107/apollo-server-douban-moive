import axios from 'axios'

const me = 'https://api.douban.com'
const other = 'https://douban.uieee.com'

const proxy = !false

const baseUrl = proxy ? other : me

export async function getMovie(id: string) {
  let data = await axios.get(`${baseUrl}/v2/movie/subject/${id}`)
  return data.data
}

export async function getTop250(start: number, count: number) {
  let data = await axios.get(`${baseUrl}/v2/movie/top250`, {
    params: {
      start,
      count,
    },
  })

  return data.data.subject
}
