import { Response } from 'express'
import { AuthenticatedRequest } from '../middlewares/auth.middleware'
import { adminServices } from './admin.services'
import OrderModel from '../order/order.model'
import { orderServices } from '../order/order.services'

//user based/related admin controllers

const getUsers = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const users = await adminServices.getUsersFronDB()
    if (!users) {
      res.status(400).json({
        message: 'No users available',
      })
      return
    }

    res.status(200).json(users)
  } catch (error) {
    console.log(error)
  }
}

const addUsers = async (req: AuthenticatedRequest, res: Response) => {
  const { name, email, password, role } = req.body

  try {
    const user = await adminServices.isUserExistToTB(email)
    if (user) {
      res.status(400).json({
        message: 'This user already exist in DB',
      })
    }
    const newUser = {
      name,
      email,
      password,
      role,
    }

    const addUser = await adminServices.addUserToDB(newUser)
    res.status(200).json({
      message: 'user created successfully',
      data: addUser,
    })
  } catch (error) {
    console.log(error)
  }
}

const updateUserInfo = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params
  const { name, email, role } = req.body

  try {
    const updatedUser = await adminServices.updateUserInDB(id, {
      name,
      email,
      role,
    })

    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    res
      .status(200)
      .json({ message: 'User updated successfully', user: updatedUser })
  } catch (error) {
    console.log(error)
  }
}

const deleteUser = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params

  try {
    const result = await adminServices.deleteUserFromDB(id)

    if (!result) {
      res.status(400).json({
        message: 'User not found',
      })
      return
    }

    res.status(200).json({
      message: 'User deleted successfully',
    })
  } catch (error) {
    console.log(error)
  }
}

//product based/related admin controller

const getProducts = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const products = await adminServices.getAllProductsFromDB()
    res.status(200).json(products)
  } catch (error) {
    console.log(error)
  }
}

// order based/related admin controllers

const getOrders = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const orders = await adminServices.getAllOrdersFromDB()
    res.status(200).json(orders)
  } catch (error) {
    console.log(error)
  }
}

const updateOrderStatus = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params
  const { status } = req.body

  try {
    const updatedOrder = await adminServices.updateOrderStatusInDB(id, status)

    if (!updatedOrder) {
      res.status(404).json({ message: 'Order not found' })
      return
    }

    res
      .status(200)
      .json({ message: 'Order updated successfully', order: updatedOrder })
  } catch (error) {
    console.error('Error updating order:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

const deleteOrder = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const order = await orderServices.deleteSingleOrderById(req.params.id)

    res.status(200).json({
      message: 'Order deleted successfully',
      deletedData: order,
    })
  } catch (error) {
    console.log(error)
  }
}

export const adminControllers = {
  getUsers,
  addUsers,
  updateUserInfo,
  deleteUser,
  getProducts,
  getOrders,
  updateOrderStatus,
  deleteOrder,
}
