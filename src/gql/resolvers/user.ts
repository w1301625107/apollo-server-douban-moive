// 引入外部套件
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import users from '../../fake_data/user'

// 定義 bcrypt 加密所需 saltRounds 次數
const SALT_ROUNDS = 2
// 定義 jwt 所需 secret (可隨便打)
const SECRET = 'just_a_random_secret'

const hash = text => bcrypt.hash(text, SALT_ROUNDS)

const createToken = ({ id, email, name }) =>
  jwt.sign({ id, email, name }, SECRET, {
    expiresIn: '1d',
  })

const addUser = ({ name, email, password }) => {
  const user = {
    id: users[users.length - 1].id + 1,
    name,
    email,
    password,
  }
  users.push(user)

  return user
}

const resolvers = {
  Query: {},
  Mutation: {
    signUp: async (root, { name, email, password }, context) => {
      // 1. 檢查不能有重複註冊 email
      const isUserEmailDuplicate = users.some(user => user.email === email)
      if (isUserEmailDuplicate) throw new Error('User Email Duplicate')

      // 2. 將 passwrod 加密再存進去。非常重要 !!
      const hashedPassword = await hash(password)
      // 3. 建立新 user
      return addUser({ name, email, password: hashedPassword })
    },
    login: async (root, { email, password }, context) => {
      // 1. 透過 email 找到相對應的 user
      const user = users.find(user => user.email === email)
      if (!user) throw new Error('Email Account Not Exists')

      // 2. 將傳進來的 password 與資料庫存的 user.password 做比對
      const passwordIsValid = await bcrypt.compare(password, user.password)
      if (!passwordIsValid) throw new Error('Wrong Password')

      // 3. 成功則回傳 token
      return { token: await createToken(user) }
    },
  },
}

export default resolvers
