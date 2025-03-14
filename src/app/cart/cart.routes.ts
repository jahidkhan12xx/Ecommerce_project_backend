import express from 'express'
import { cartController } from './cart.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const router = express.Router()

router.post('/', cartController.addToCart)
router.put('/', cartController.updateProductProductQuantity)
router.delete('/', cartController.deleteCart)
router.get('/', cartController.getCart)
router.post('/merge', authMiddleware, cartController.mergeCart)

export const cartRoutes = router
