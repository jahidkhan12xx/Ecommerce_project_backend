import { Request, Response, NextFunction } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import { verifyToken } from './jwt.utils'

interface UserPayload extends JwtPayload {
  role: string
  email: string
}

export interface AuthenticatedRequest<T = any> extends Request<T> {
  user?: UserPayload
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.token

  if (!token) {
    res.status(401).json({ message: 'Unauthorized: No token found in cookies' })
    return
  }

  try {
    const decoded = verifyToken(token) as UserPayload
    req.user = decoded
    next()
  } catch (error) {
    console.error('Invalid Token:', error)
    return
  }
}

export const adminMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  if (req.user?.role !== 'admin') {
    res
      .status(403)
      .json({ message: 'Forbidden: Only admin can access this route' })
    return
  }
  next()
}
