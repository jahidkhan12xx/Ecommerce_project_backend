import { Types } from 'mongoose'
import CheckoutModel from './checkout.model'
import { CheckoutItems } from './checkout.interface'

const createCheckoutIntoDB = async (
  user: Types.ObjectId,
  checkoutItems: CheckoutItems,
  shippingAddress: string,
  paymentMethod: string,
  totalPrice: number,
) => {
  const res = await CheckoutModel.create({
    userId: user._id,
    checkoutItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
    paymentStatus: 'pending',
    isPaid: false,
  })

  return res
}

const findCheckoutDataIntoDB = async (id: Types.ObjectId) => {
  const res = await CheckoutModel.findById(id)
  return res
}

export const checkoutServices = {
  createCheckoutIntoDB,
  findCheckoutDataIntoDB,
}
