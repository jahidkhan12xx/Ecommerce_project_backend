import { generateToken } from '../middlewares/jwt.utils'
import User from './users.interface'
import { Users } from './users.model'
import bcrypt from 'bcryptjs'

const createUserIntoDB = async (user: User) => {
  const res = await Users.create(user)
  return res
}

const loginUserService = async (email: string, password: string) => {
  const user = await Users.findOne({ email })
  if (!user) {
    throw new Error('User not found')
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    throw new Error('Invalid password')
  }

  const payload = { email: user.email, role: user.role }
  const token = generateToken(payload)

  return { user, token }
}

const findSingleUserById = async (id: string | undefined) => {
  const user = await Users.findById({ _id: id }).select('-password')
  if (!user) {
    throw new Error('User not found')
  }
  return user
}

export const UsersServices = {
  createUserIntoDB,
  loginUserService,
  findSingleUserById,
}
