import { Request, Response } from 'express'
import User from './users.interface'
import { UsersServices } from './users.services'
import { userValidationSchema } from './users.validation'
import { Users } from './users.model'
import { generateToken } from '../middlewares/jwt.utils'
import { AuthenticatedRequest } from '../middlewares/auth.middleware'

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: User = req.body
    const isExists = await Users.findOne({ email: user.email })
    if (isExists) {
      res.status(400).json({ success: false, message: 'Email already exists' })
      return
    }

    const zodVal = userValidationSchema.safeParse(user)
    if (zodVal.success) {
      const result = await UsersServices.createUserIntoDB(zodVal.data)
      const payload = { email: result.email, role: result.role }
      const token = generateToken(payload)
      res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'none',
        maxAge: 3600000,
      })

      res.status(200).json({
        sucess: true,
        message: 'User created successfully',
        user: result,
      })
    } else {
      res.status(400).json({
        success: false,
        message: zodVal.error.errors,
      })
    }
  } catch (error) {
    const err = error as Error
    res.status(400).json({ success: false, message: err.message })
  }
}

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const { user, token } = await UsersServices.loginUserService(
      email,
      password,
    )

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'none',
      maxAge: 3600000,
    })

    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      user: user,
    })
  } catch (error) {
    const err = error as Error
    res.status(400).json({ success: false, message: err.message })
  }
}

const getUserProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userProfile = await UsersServices.findSingleUserById(req.user?.id)
    res.status(200).json({
      userProfile,
    })
  } catch (error) {
    console.log(error)
  }
}

export const UserControllers = {
  createUser,
  loginUser,
  getUserProfile,
}
