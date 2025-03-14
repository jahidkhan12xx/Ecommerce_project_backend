import { Response } from 'express'
import { AuthenticatedRequest } from '../middlewares/auth.middleware'
import { productService } from './product.service'

const addProducts = async (req: AuthenticatedRequest, res: Response) => {
  // Add products
  const data = req.body
  try {
    const product = await productService.addProductIntoDB(data)
    res.status(201).json(product)
  } catch (error) {
    console.log(error)
  }
}

const updateProducts = async (req: AuthenticatedRequest, res: Response) => {
  // Update products
  const id = req.params.id
  const data = req.body
  try {
    const product = await productService.updateProductIntoDB(id, data)
    if (!product) {
      res.status(404).json({ message: 'Product not found' })
      return
    }

    res.status(200).json(product)
  } catch (error) {
    console.log(error)
  }
}

const deleteProduct = async (req: AuthenticatedRequest, res: Response) => {
  const id = req.params.id
  try {
    const product = await productService.deleteProductFromDB(id)
    if (!product) {
      res.status(404).json({ message: 'Product not found' })
      return
    }
    res.status(200).json(product)
  } catch (error) {
    console.log(error)
  }
}

const getProducts = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      collections,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    } = req.query

    let query: any = {}

    // Collections
    if (
      typeof collections === 'string' &&
      collections.trim().toLowerCase() !== 'all' &&
      collections.trim() !== ''
    ) {
      query.collections = collections.trim()
    }

    // Category
    if (
      typeof category === 'string' &&
      category.trim().toLowerCase() !== 'all' &&
      category.trim() !== ''
    ) {
      query.category = category.trim()
    }

    // Material
    if (typeof material === 'string' && material.trim() !== '') {
      query.material = { $in: material.split(',').map(item => item.trim()) }
    }

    // Brand
    if (typeof brand === 'string' && brand.trim() !== '') {
      query.brand = { $in: brand.split(',').map(item => item.trim()) }
    }

    // Size
    if (typeof size === 'string' && size.trim() !== '') {
      query.sizes = { $in: size.split(',').map(item => item.trim()) }
    }

    // Color
    if (typeof color === 'string' && color.trim() !== '') {
      query.colors = { $in: color.split(',').map(item => item.trim()) }
    }

    // Gender
    if (typeof gender === 'string' && gender.trim() !== '') {
      query.gender = gender.trim()
    }

    // Price
    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) {
        query.price.$gte = Number(minPrice)
      }
      if (maxPrice) {
        query.price.$lte = Number(maxPrice)
      }
    }

    // Search
    if (typeof search === 'string' && search.trim() !== '') {
      query.$or = [
        { name: { $regex: search.trim(), $options: 'i' } },
        { description: { $regex: search.trim(), $options: 'i' } },
      ]
    }

    // Sorting
    let sort: any = {}
    if (sortBy === 'priceAsc') {
      sort.price = 1
    } else if (sortBy === 'priceDesc') {
      sort.price = -1
    } else if (sortBy === 'popularity') {
      sort.rating = -1
    }

    const products = await productService.getProductsFromDB(
      query,
      sort,
      Number(limit) || 0,
    )

    res.status(200).json(products)
  } catch (error) {
    console.error('Error getting products:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

const getSingleProduct = async (req: AuthenticatedRequest, res: Response) => {
  const id = req.params.id
  try {
    const product = await productService.getSingeProductFromDB(id)
    if (!product) {
      res.status(404).json({ message: 'Product not found' })
      return
    }
    res.status(200).json(product)
  } catch (error) {
    console.log(error)
  }
}

const gerSimilarProducts = async (req: AuthenticatedRequest, res: Response) => {
  const id = req.params.id
  try {
    const product = await productService.getSingeProductFromDB(id)
    if (!product) {
      res.status(404).json({ message: 'Product not found' })
      return
    }
    const similarProducts =
      await productService.getSimilarProductsFromDB(product)
    res.status(200).json(similarProducts)
  } catch (error) {
    console.log(error)
  }
}

const bestSellingProducts = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    const products = await productService.bestSellingProductsFromDB()
    if (!products) {
      res.status(404).json({ message: 'No Best seller found' })
      return
    }
    res.status(200).json(products)
  } catch (error) {
    console.log(error)
  }
}

const newArivalProducts = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const products = await productService.newArivalProductsFromDB()
    if (!products) {
      res.status(404).json({ message: 'No new arrival found' })
      return
    }
    res.status(200).json(products)
  } catch (error) {
    console.log(error)
  }
}

export const productController = {
  addProducts,
  updateProducts,
  deleteProduct,
  getProducts,
  getSingleProduct,
  gerSimilarProducts,
  bestSellingProducts,
  newArivalProducts,
}
