import jwt, { Secret, SignOptions, JwtPayload } from 'jsonwebtoken'
import envConfig from '../config/env'

export interface TokenPayload extends JwtPayload {
  email: string
  role: string
}

export const generateToken = (
  payload: TokenPayload,
  expiresIn: string | number = '1h',
): string => {
  const options: SignOptions = {
    expiresIn: expiresIn as SignOptions['expiresIn'],
  }
  return jwt.sign(payload, envConfig.secretKey as Secret, options)
}

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, envConfig.secretKey as Secret) as TokenPayload
  } catch (error) {
    console.error('Invalid Token:', error)
    return null
  }
}
