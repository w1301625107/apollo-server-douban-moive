const animals = [
  { name: 'Chiken Litte', wingSpanLength: 10 },
  { name: 'Goku', armSpanLength: 20 },
  { name: 'King Kong', armSpanLength: 200 },
]

const resolvers = {
  Animal: {
    // 一定要實作這一個特殊 field
    __resolveType(obj, context, info) {
      console.log('TCL: __resolveType -> context', context)
      console.log('TCL: __resolveType -> info', info)
      console.log('TCL: __resolveType -> obj', obj)
      // obj 為該 field 得到的資料
      if (obj.wingSpanLength) {
        // 回傳相對應得 Object type 名稱
        return 'Bird'
      }

      if (obj.armSpanLength) {
        return 'Monkey'
      }

      return null
    },
  },
  Query: {
    animal: (root, { name }) => {
      return animals.find(animal => animal.name === name)
    },
    animals: () => animals,
  },
}

export default resolvers
