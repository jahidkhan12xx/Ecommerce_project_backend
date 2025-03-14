import { Cart } from './cart.interface'
import CartModel from './cart.model'

const getCartFromDB = async (guestId?: string, userId?: string) => {
  return await CartModel.findOne(userId ? { userId } : { guestId })
}

const saveCartToDB = async (cart: Cart) => {
  const res = await CartModel.create(cart)
  return res
}

export const cartService = {
  getCartFromDB,
  saveCartToDB,
}
