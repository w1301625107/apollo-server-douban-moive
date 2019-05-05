import users from '../fake_data/user'

export const addUser = ({ name, email, password }) => {
  const user = {
    id: users[users.length - 1].id + 1,
    name,
    email,
    password,
  }
  users.push(user)

  return user
}

export const findUserByUserId = (id: number) =>
  users.find(user => user.id == id)

export const uniqueEmail = (email: string) =>
  users.some(user => user.email === email)

export const findUserByEmail = (email: string) =>
  users.find(user => user.email === email)

export default { addUser, findUserByUserId, uniqueEmail, findUserByEmail }
