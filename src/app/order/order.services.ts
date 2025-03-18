import { Types } from 'mongoose'
import OrderModel from './order.model'

const findOrdersByUserId = async (id: Types.ObjectId) => {
  const res = await OrderModel.find({
    userId: id,
  }).sort({
    createdAt: -1,
  })
  return res
}

const findSingleOrderById = async (id: Types.ObjectId) => {
  const res = await OrderModel.findById(id).populate('userId', 'name email')
  return res
}

const deleteSingleOrderById = async (id: Types.ObjectId) => {
  const res = await OrderModel.findByIdAndDelete(id)
  return res
}

export const orderServices = {
  findOrdersByUserId,
  findSingleOrderById,
  deleteSingleOrderById,
}
