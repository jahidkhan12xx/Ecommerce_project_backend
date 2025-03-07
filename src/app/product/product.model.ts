import mongoose, { Schema } from 'mongoose'
import { Product } from './product.interface'

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    countInStock: { type: Number, required: true, default: 0 },
    sku: { type: String, unique: true, required: true },
    category: { type: String, required: true },
    brand: { type: String },
    sizes: {
      type: [String],
      required: true,
    },
    colors: {
      type: [String],
      required: true,
    },
    collections: {
      type: [String],
      required: true,
    },
    material: { type: String },
    gender: { type: String, enum: ['Men', 'Women', 'Unisex'] },
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String },
      },
    ],
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    tags: [String],
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    metaTitle: { type: String },
    metaDescription: { type: String },
    metaKeywords: { type: String },
    dimensions: {
      length: { type: Number },
      width: { type: Number },
      height: { type: Number },
    },
    weight: { type: Number },
  },
  {
    timestamps: true,
  },
)

const ProductModel = mongoose.model<Product>('Product', ProductSchema)

export default ProductModel
