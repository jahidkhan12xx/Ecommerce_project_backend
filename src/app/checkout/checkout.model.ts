import { Checkout, CheckoutItems } from './checkout.interface'
import { model, Schema } from 'mongoose'

const checkoutItemSchema = new Schema<CheckoutItems>(
  {
    productId: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
    quantity: { type: Number, required: true },
    color: { type: String, required: true },
  },
  {
    _id: false,
  },
)

const checkoutSchema = new Schema<Checkout>(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    checkoutItems: { type: [checkoutItemSchema], required: true },
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Schema.Types.Mixed },
    paymentStatus: { type: String, default: 'pending' },
    paymentDetails: { type: Schema.Types.Mixed },
    isFinalized: { type: Boolean, default: false },
    finalizedAt: { type: Schema.Types.Mixed },
  },
  { timestamps: true },
)

const CheckoutModel = model<Checkout>('Checkout', checkoutSchema)

export default CheckoutModel
