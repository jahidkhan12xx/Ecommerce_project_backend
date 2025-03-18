import { Response } from 'express'
import { AuthenticatedRequest } from '../middlewares/auth.middleware'
import { Users } from '../users/users.model'
import { checkoutServices } from './checkout.services'
import { Checkout } from './checkout.interface'
import OrderModel from '../order/order.model'
import { cartService } from '../cart/cart.services'

const createCheckout = async (req: AuthenticatedRequest, res: Response) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body

  if (!checkoutItems || checkoutItems.length === 0) {
    res.status(400).json({
      message: 'No items in checkout',
    })
    return
  }
  if (!req.user || !req.user.email) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }
  const userL = await Users.findOne({ email: req.user.email })
  if (!userL) {
    res.status(404).json({ message: 'User not found' })
    return
  }

  try {
    const newCheckout = await checkoutServices.createCheckoutIntoDB(
      userL._id,
      checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    )
    console.log(`Checkout created for user : ${userL._id}`)
    res.status(201).json(newCheckout)
  } catch (error) {
    console.log(error)
  }
}

const updateCheckout = async (req: AuthenticatedRequest, res: Response) => {
  const { paymentStatus, paymentDetails } = req.body

  try {
    const checkout = await checkoutServices.findCheckoutDataIntoDB(
      req.params.id,
    )
    if (!checkout) {
      res.status(404).json({
        message: 'Checkout not found',
      })
      return
    }
    if (paymentStatus === 'paid') {
      checkout.isPaid = true
      checkout.paymentStatus = paymentStatus
      checkout.paymentDetails = paymentDetails
      checkout.paidAt = Date.now()

      await checkout.save()

      res.status(200).json(checkout)
    } else {
      res.status(400).json({
        message: 'Invalid Payment status',
      })
    }
  } catch (error) {
    console.log(error)
  }
}

const finalizeCheckout = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const checkout = await checkoutServices.findCheckoutDataIntoDB(
      req.params.id,
    )

    if (!checkout) {
      res.status(404).json({
        message: 'checkout not found',
      })
      return
    }

    if (checkout.isPaid && !checkout.isFinalized) {
      const finalOrder = await OrderModel.create({
        userId: checkout.userId,
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentStatus: 'paid',
        paymentDetails: checkout.paymentDetails,
      })

      checkout.isFinalized = true
      checkout.finalizedAt = Date.now()
      await checkout.save()

      const result = await cartService.deleteCartFromDBbyUserID(checkout.userId)

      res.status(201).json(result)
    } else if (checkout.isFinalized) {
      res.status(400).json({
        message: 'Checkout already finalized',
      })
    } else {
      res.status(400).json({
        message: 'Checkout is not paid',
      })
    }
  } catch (error) {
    console.log(error)
  }
}

export const checkoutController = {
  createCheckout,
  updateCheckout,
  finalizeCheckout,
}
