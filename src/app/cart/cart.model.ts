import mongoose, { Schema } from 'mongoose'
import { Cart, CartItem } from './cart.interface'

const CartItemSchema = new Schema<CartItem>(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: {
      url: { type: String, required: true },
      alt: { type: String },
    },
    size: { type: String, required: true },
    color: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
  },
  { _id: false },
)

const CartSchema = new Schema<Cart>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    guestId: {
      type: String,
    },
    products: [CartItemSchema],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

const CartModel = mongoose.model<Cart>('Cart', CartSchema)

export default CartModel
