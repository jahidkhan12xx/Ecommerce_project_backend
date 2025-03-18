import express from 'express'
import { orderController } from './order.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const router = express.Router()

router.get('/my-orders', authMiddleware, orderController.getMyOrder)
router.get('/:id', authMiddleware, orderController.getSingleOrder)

export const orderRoutes = router
