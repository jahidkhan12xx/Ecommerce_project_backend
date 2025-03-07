export interface Product {
  _id?: string
  name: string
  description: string
  price: number
  discountPrice?: number
  countInStock: number
  sku: string
  category: string
  brand: string
  sizes: string[]
  colors: string[]
  collections: string[]
  material: string
  gender: 'Men' | 'Women' | 'Unisex'
  images: string[]
  isFeatured: boolean
  isPublished: boolean
  rating: number
  numReviews: number
  tags: string[]
  user: string
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string
  dimensions: {
    length: number
    width: number
    height: number
  }
  weight: number
}
