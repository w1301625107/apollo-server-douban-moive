// 引入外部套件
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

// 定義 bcrypt 加密所需 saltRounds 次數
const SALT_ROUNDS = 2
// 定義 jwt 所需 secret (可隨便打)
const SECRET = 'just_a_random_secret'

const hash = text => bcrypt.hash(text, SALT_ROUNDS)

const createToken = ({ id, email, name }) =>
  jwt.sign({ id, email, name }, SECRET, {
    expiresIn: '1d',
  })

const verify = token => jwt.verify(token, SECRET)

const compare = (one: string, two: string): boolean => bcrypt.compare(one, two)

export default {
  hash,
  createToken,
  verify,
  compare,
}
