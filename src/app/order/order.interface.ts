import { Types } from 'mongoose'

export interface OrderItems {
  productId: Types.ObjectId
  name: string
  image: string
  price: number
  size: string
  color: string
  quantity: number
}

export interface Order {
  userId: Types.ObjectId
  orderItems: OrderItems[]
  shippingAddress: {
    address: string
    city: string
    postalCode: string
    country: string
  }
  paymentMethod: string
  totalPrice: number
  isPaid: boolean
  paidAt: Date
  isDelivered: boolean
  deliveredAt: Date | number
  paymentStatus: string
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled'
}
