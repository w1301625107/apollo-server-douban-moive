const authors = [{ name: 'John' }, { name: 'Mary' }]
const books = [{ title: 'Journey to the West' }, { title: 'Mary Loves Me' }]
const resolvers = {
  Result: {
    // 一定要實作這一個特殊 field
    __resolveType(obj, context, info) {
      // obj 為該 field 得到的資料
      if (obj.name) {
        // 回傳相對應得 Object type 名稱
        return 'Author'
      }

      if (obj.title) {
        return 'Book'
      }

      return null
    },
  },
  Query: {
    UnionTest: (root, { contains }) => {
      return [
        ...authors.filter(author => author.name.includes(contains)),
        ...books.filter(book => book.title.includes(contains)),
      ]
    },
  },
}

export default resolvers
