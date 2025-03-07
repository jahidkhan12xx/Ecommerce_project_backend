import express from 'express'
import { UserControllers } from './users.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const router = express.Router()

router.post('/register', UserControllers.createUser)
router.post('/login', UserControllers.loginUser)
router.get('/profile', authMiddleware, UserControllers.getUserProfile)

export const usersRoutes = router
