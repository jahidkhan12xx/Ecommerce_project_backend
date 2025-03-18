import { model, Schema } from 'mongoose'
import { Subscribe } from './subscribe.interface'

const subscriberSchema = new Schema<Subscribe>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  subcribeAt: {
    type: Date,
    default: Date.now(),
  },
})

const subscriberModel = model<Subscribe>('Subscriber', subscriberSchema)

export default subscriberModel
