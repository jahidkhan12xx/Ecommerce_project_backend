import { Types } from 'mongoose'

export interface CheckoutItems {
  productId: Types.ObjectId
  name: string
  image: string
  price: number
  size: string
  color: string
  quantity: number
}

export interface Checkout {
  userId: Types.ObjectId
  checkoutItems: CheckoutItems[]
  shippingAddress: {
    address: string
    city: string
    postalCode: string
    country: string
  }
  paymentMethod: string
  totalPrice: number
  isPaid: boolean
  paidAt: Date | number
  paymentStatus: string
  paymentDetails: any
  isFinalized: boolean
  finalizedAt: Date | number
}
