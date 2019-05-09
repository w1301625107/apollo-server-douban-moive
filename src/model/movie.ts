import { getMovie } from '../api/movie'
import top250 from '../fake_data/top250'

export function getMovieById(id: string) {
  console.log('TCL: getMovieById -> id', id)
  return getMovie(id)
}

export async function getTop250(
  first?: number,
  after?: string,
  last?: number,
  before?: string,
) {
  let from: number = 0
  let to: number = 20
  // 取得下一頁資料
  if (first) {
    if (after) {
      from =
        top250.findIndex(i => i.id == new Buffer(after, 'base64').toString()) +
        1
      to = from + first
    } else {
      from = 0
      to = first
    }
  }

  // 或是取得上一頁資料
  if (last) {
    to = top250.findIndex(i => i.id == new Buffer(before, 'base64').toString())
    from = last - to
  }

  const allCount = top250.length

  const ids = top250.slice(from, to).map(movie => movie.id)

  const reqs = ids.map(id => getMovieById(id))

  const datas = await Promise.all(reqs)
  return { data: datas, to, from, allCount }
}

export default {
  getMovieById,
  getTop250,
}
