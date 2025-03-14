import { Product } from './product.interface'
import ProductModel from './product.model'

const addProductIntoDB = async (data: Product) => {
  const res = await ProductModel.create(data)
  return res
}
const updateProductIntoDB = async (id: string, data: Product) => {
  const updatedProduct = await ProductModel.findByIdAndUpdate(
    id,
    {
      $set: data,
    },
    { new: true, runValidators: true },
  )

  return updatedProduct
}

const deleteProductFromDB = async (id: string) => {
  const product = await ProductModel.findByIdAndDelete(id)
  return product
}

const getProductsFromDB = async (query: any, sort: string, limit: number) => {
  const products = await ProductModel.find(query).sort(sort).limit(limit)
  return products
}

const getSingeProductFromDB = async (id: string) => {
  const product = await ProductModel.findById(id)
  return product
}

const getSimilarProductsFromDB = async (product: Product) => {
  const products = await ProductModel.find({
    _id: { $ne: product._id },
    $and: [{ category: product.category }, { gender: product.gender }],
  })
  return products
}

const bestSellingProductsFromDB = async () => {
  const products = await ProductModel.find({}).sort({ rating: -1 })
  return products
}

const newArivalProductsFromDB = async () => {
  const products = await ProductModel.find({}).sort({ createdAt: -1 })
  return products
}

export const productService = {
  addProductIntoDB,
  updateProductIntoDB,
  deleteProductFromDB,
  getProductsFromDB,
  getSingeProductFromDB,
  getSimilarProductsFromDB,
  bestSellingProductsFromDB,
  newArivalProductsFromDB,
}
