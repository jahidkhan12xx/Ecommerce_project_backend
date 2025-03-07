import { z } from 'zod'

const ProductSchema = z.object({
  _id: z.string().optional(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  discountPrice: z.number().optional(),
  countInStock: z.number(),
  sku: z.string(),
  category: z.string(),
  brand: z.string(),
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
  collections: z.array(z.string()),
  material: z.string(),
  gender: z.enum(['Men', 'Women', 'Unisex']),
  images: z.array(z.string()),
  isFeatured: z.boolean(),
  isPublished: z.boolean(),
  rating: z.number(),
  numReviews: z.number(),
  tags: z.array(z.string()),
  user: z.string(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  dimensions: z.object({
    length: z.number(),
    width: z.number(),
    height: z.number(),
  }),
  weight: z.number(),
})

export default ProductSchema
