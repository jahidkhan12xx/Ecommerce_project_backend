import { Response } from 'express'
import { AuthenticatedRequest } from '../middlewares/auth.middleware'
import { orderServices } from './order.services'

const getMyOrder = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    res.status(404).json({ message: 'Unauthorized' })
    return
  }
  try {
    const orders = await orderServices.findOrdersByUserId(req.user._id)
    res.status(200).json(orders)
  } catch (error) {
    console.log(error)
  }
}

const getSingleOrder = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const order = await orderServices.findSingleOrderById(req.params.id)

    if (!order) {
      res.status(404).json({
        message: 'Order not found',
      })
    }

    res.status(200).json(order)
  } catch (error) {
    console.log(error)
  }
}

export const orderController = {
  getMyOrder,
  getSingleOrder,
}
