import express from 'express'
import { adminMiddleware, authMiddleware } from '../middlewares/auth.middleware'
import { productController } from './product.controller'

const router = express.Router()

router.post(
  '/add-products',
  authMiddleware,
  adminMiddleware,
  productController.addProducts,
)
router.put(
  '/update-products/:id',
  authMiddleware,
  adminMiddleware,
  productController.updateProducts,
)
router.delete(
  '/delete-products/:id',
  authMiddleware,
  adminMiddleware,
  productController.deleteProduct,
)
router.get('/get-products', productController.getProducts)

router.get('/similar/:id', productController.gerSimilarProducts)
router.get('/best-seller', productController.bestSellingProducts)
router.get('/:id', productController.getSingleProduct)

export const productRoutes = router
