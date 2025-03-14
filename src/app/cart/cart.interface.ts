import { Types } from 'mongoose'

export interface CartItem {
  productId: Types.ObjectId
  name: string
  price: number
  image: {
    url: string
    alt?: string
  }
  size: string
  color: string
  quantity: number
}

export interface Cart {
  userId?: Types.ObjectId
  guestId?: string
  products: CartItem[]
  totalPrice: number
}
