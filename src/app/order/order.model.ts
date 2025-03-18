import { model, Schema, Types } from 'mongoose'
import { Order, OrderItems } from './order.interface'

const orderItemSchema = new Schema<OrderItems>({
  productId: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: String, required: true },
  color: { type: String, required: true },
  quantity: { type: Number, required: true },
})

const orderSchema = new Schema<Order>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    orderItems: { type: [orderItemSchema], required: true },
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Schema.Types.Mixed },
    paymentStatus: { type: String, default: 'pending' },
    status: {
      type: String,
      enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Processing',
    },
  },
  { timestamps: true },
)

const OrderModel = model<Order>('Order', orderSchema)

export default OrderModel
