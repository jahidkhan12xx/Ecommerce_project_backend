import express from 'express'
import { adminMiddleware, authMiddleware } from '../middlewares/auth.middleware'
import { adminControllers } from './admin.controller'

const router = express.Router()

// user related admin routes

router.get(
  '/get-users',
  authMiddleware,
  adminMiddleware,
  adminControllers.getUsers,
)
router.post(
  '/add-user',
  authMiddleware,
  adminMiddleware,
  adminControllers.addUsers,
)

router.put(
  '/update-user/:id',
  authMiddleware,
  adminMiddleware,
  adminControllers.updateUserInfo,
)

router.delete(
  '/delete-user/:id',
  authMiddleware,
  adminMiddleware,
  adminControllers.deleteUser,
)

// product related admin routes

router.get(
  '/get-products',
  authMiddleware,
  adminMiddleware,
  adminControllers.getProducts,
)

// oder related admin routes

router.get(
  '/get-orders',
  authMiddleware,
  adminMiddleware,
  adminControllers.getOrders,
)

router.put(
  '/update-orderStatus/:id',
  authMiddleware,
  adminMiddleware,
  adminControllers.updateOrderStatus,
)

router.delete(
  '/delete-order/:id',
  authMiddleware,
  adminMiddleware,
  adminControllers.deleteOrder,
)

export const adminRoutes = router
