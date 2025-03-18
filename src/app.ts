import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { usersRoutes } from './app/users/users.router'
import cookieParser from 'cookie-parser'
import { productRoutes } from './app/product/product.router'
import { cartRoutes } from './app/cart/cart.routes'
import { checkoutRoutes } from './app/checkout/checkout.routes'
import { orderRoutes } from './app/order/order.routes'
import { uploadRouter } from './app/utils/upload.routes'
import { subscriberRoutes } from './app/subscribe/subscribe.router'
import { adminRoutes } from './app/admin/admin.routes'
const app: Application = express()

//  parser
app.use(express.json())
app.use(cors())
app.use(cookieParser())

// Routes

app.use('/api/v1/users', usersRoutes)
app.use('/api/v1/products', productRoutes)
app.use('/api/v1/cart', cartRoutes)
app.use('/api/v1/checkout', checkoutRoutes)
app.use('/api/v1/orders', orderRoutes)
app.use('/api/v1/upload', uploadRouter)
app.use('/api/v1/subscribe', subscriberRoutes)

//admin routes

app.use('/api/v1/admin', adminRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Its working! ���')
})

export default app
