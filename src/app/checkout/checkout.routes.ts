import express from 'express'
import { checkoutController } from './checkout.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const router = express.Router()

router.post('/', authMiddleware, checkoutController.createCheckout)
router.put('/:id/pay', authMiddleware, checkoutController.updateCheckout)
router.post(
  '/:id/finalize',
  authMiddleware,
  checkoutController.finalizeCheckout,
)

export const checkoutRoutes = router
