import {
  addUser,
  findUserByUserId,
  uniqueEmail,
  findUserByEmail,
} from '../../model/user'

const resolvers = {
  Query: {
    me: (root, args, { me }) => {
      return findUserByUserId(me.id)
    },
  },
  Mutation: {
    signUp: async ({ auth }, { name, email, password }, context) => {
      // 1. 檢查不能有重複註冊 email
      const isUserEmailDuplicate = uniqueEmail(email)
      if (isUserEmailDuplicate) throw new Error('User Email Duplicate')

      // 2. 將 passwrod 加密再存進去。非常重要 !!
      const hashedPassword = await auth.hash(password)
      // 3. 建立新 user
      return addUser({ name, email, password: hashedPassword })
    },
    login: async ({ auth }, { email, password }, context) => {
      // 1. 透過 email 找到相對應的 user
      const user = findUserByEmail(email)
      if (!user) throw new Error('Email Account Not Exists')

      // 2. 將傳進來的 password 與資料庫存的 user.password 做比對
      const passwordIsValid = await auth.compare(password, user.password)
      if (!passwordIsValid) throw new Error('Wrong Password')

      // 3. 成功則回傳 token
      return { token: await auth.createToken(user) }
    },
  },
}

export default resolvers
