import { Types } from 'mongoose'
import User from '../users/users.interface'
import { Users } from '../users/users.model'
import ProductModel from '../product/product.model'
import OrderModel from '../order/order.model'

// user related services function

const getUsersFronDB = async () => {
  const res = await Users.find()
  return res
}

const isUserExistToTB = async (email: string) => {
  const res = await Users.findOne({ email })
  return res
}

const findUserWithIdInDB = async (id: Types.ObjectId) => {
  const res = await Users.findById(id)
  return res
}

const addUserToDB = async (user: User) => {
  const res = await Users.create(user)
  return res
}
const updateUserInDB = async (id: string, updates: any) => {
  const res = await Users.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  })
  return res
}

const deleteUserFromDB = async (id: Types.ObjectId) => {
  const res = await Users.findByIdAndDelete(id)
  return res
}

// product related services function

const getAllProductsFromDB = async () => {
  const res = await ProductModel.find().sort({
    createdAt: -1,
  })
  return res
}

// order related services function

const getAllOrdersFromDB = async () => {
  const res = await OrderModel.find().populate('userId', 'name email')
  return res
}

const updateOrderStatusInDB = async (id: Types.ObjectId, status: string) => {
  const res = await OrderModel.findByIdAndUpdate(
    id,
    {
      $set: {
        status,
        isDelivered: status === 'Delivered',
        deliveredAt: status === 'Delivered' ? Date.now() : null,
      },
    },
    { new: true, runValidators: true },
  )

  return res
}

export const adminServices = {
  getUsersFronDB,
  isUserExistToTB,
  addUserToDB,
  findUserWithIdInDB,
  updateUserInDB,
  deleteUserFromDB,
  getAllProductsFromDB,
  getAllOrdersFromDB,
  updateOrderStatusInDB,
}
