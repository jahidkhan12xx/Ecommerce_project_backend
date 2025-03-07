import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { usersRoutes } from './app/users/users.router'
import cookieParser from 'cookie-parser'
import { productRoutes } from './app/product/product.router'
const app: Application = express()

//  parser
app.use(express.json())
app.use(cors())
app.use(cookieParser())

// Routes

app.use('/api/v1/users', usersRoutes)
app.use('/api/v1/products', productRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Its working! ���')
})

export default app
