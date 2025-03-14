import { AuthenticatedRequest } from '../middlewares/auth.middleware'
import { Response } from 'express'
import ProductModel from '../product/product.model'
import { cartService } from './cart.services'
import { Cart } from './cart.interface'
import CartModel from './cart.model'
import { Users } from '../users/users.model'

const addToCart = async (req: AuthenticatedRequest, res: Response) => {
  const { productId, quantity, size, color, guestId, userId } = req.body
  try {
    const product = await ProductModel.findById(productId)
    if (!product) {
      res.status(404).json({ message: 'Product not found' })
      return
    }

    let cart = (await cartService.getCartFromDB(guestId, userId)) as Cart

    if (cart) {
      const productIndex = cart.products.findIndex(
        product =>
          product.productId.toString() === productId &&
          product.size === size &&
          product.color === color,
      )
      if (productIndex !== -1) {
        cart.products[productIndex].quantity += quantity
      } else {
        cart.products.push({
          productId,
          quantity,
          size,
          color,
          price: product.price,
          name: product.name,
          image: {
            url: product.images[0]?.url || '',
            alt: product.images[0]?.alt || '',
          },
        })
      }

      cart.totalPrice = cart.products.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0,
      )
      const theCart = await cartService.saveCartToDB(cart)

      res.status(200).json(theCart)
    } else {
      const newCart: Cart = await CartModel.create({
        userId: userId ? userId : undefined,
        guestId: guestId ? guestId : 'guest_' + new Date().getTime(),
        products: [
          {
            productId,
            quantity,
            size,
            color,
            price: product.price,
            name: product.name,
            image: {
              url: product.images[0]?.url || '',
              alt: product.images[0]?.alt || '',
            },
          },
        ],
        totalPrice: product.price * quantity,
      })
      res.status(200).json(newCart)
    }
  } catch (error) {
    console.log(error)
  }
}

const updateProductProductQuantity = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  const { productId, quantity, size, color, guestId, userId } = req.body

  try {
    let cart = (await cartService.getCartFromDB(guestId, userId)) as Cart
    if (!cart) {
      res.status(404).json({ message: 'Cart not found' })
      return
    }
    const productIndex = cart.products.findIndex(
      product =>
        product.productId.toString() === productId &&
        product.size === size &&
        product.color === color,
    )
    if (productIndex > -1) {
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity
      } else {
        cart.products.splice(productIndex, 1)
      }
    }
    cart.totalPrice = cart.products.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0,
    )
    const theCart = await cartService.saveCartToDB(cart)
    if (!theCart) {
      res.status(404).json({ message: 'Cart not found' })
      return
    }
    res.status(200).json(theCart)
  } catch (error) {
    console.log(error)
  }
}

const deleteCart = async (req: AuthenticatedRequest, res: Response) => {
  const { productId, size, color, guestId, userId } = req.body

  try {
    let cart = (await cartService.getCartFromDB(guestId, userId)) as Cart
    if (!cart) {
      res.status(404).json({ message: 'Cart not found' })
      return
    }
    const productIndex = cart.products.findIndex(
      product =>
        product.productId.toString() === productId &&
        product.size === size &&
        product.color === color,
    )

    if (productIndex > -1) {
      cart.products.splice(productIndex, 1)
    }
    cart.totalPrice = cart.products.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0,
    )
    const theCart = await cartService.saveCartToDB(cart)

    res.status(200).json(theCart)
  } catch (error) {
    console.log(error)
  }
}

const getCart = async (req: AuthenticatedRequest, res: Response) => {
  const { guestId, userId } = req.query
  try {
    const cart = await cartService.getCartFromDB(
      guestId as string,
      userId as string,
    )

    if (!cart) {
      res.status(404).json({ message: 'Cart not found' })
      return
    }
    res.status(200).json(cart)
  } catch (error) {
    console.log(error)
  }
}

const mergeCart = async (req: AuthenticatedRequest, res: Response) => {
  const { guestId } = req.body
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized: User not found' })
    return
  }
  const user = await Users.findOne({ email: req.user.email })
  if (!user) {
    res.status(404).json({ message: 'User not found' })
    return
  }

  try {
    const guestCart = (await cartService.getCartFromDB(guestId)) as Cart
    const userCart = (await cartService.getCartFromDB(
      user._id.toString(),
    )) as Cart

    if (guestCart) {
      if (guestCart.products.length === 0) {
        res.status(200).json(userCart)
        return
      }

      if (userCart) {
        guestCart.products.forEach(guest => {
          const productIndex = userCart.products.findIndex(
            item =>
              item.productId.toString() === guest.productId.toString() &&
              item.size === guest.size &&
              item.color === guest.color,
          )
          if (productIndex !== -1) {
            userCart.products[productIndex].quantity += guest.quantity
          } else {
            userCart.products.push(guest)
          }
        })

        userCart.totalPrice = userCart.products.reduce(
          (acc, product) => acc + product.price * product.quantity,
          0,
        )
        const cart = await cartService.saveCartToDB(userCart)

        try {
          await CartModel.findOneAndDelete({ guestId })
        } catch (error) {
          console.log(`${error} deleting guest cart`)
        }
        res.status(200).json(cart)
      } else {
        guestCart.userId = user._id
        guestCart.guestId = undefined
        const cart = await cartService.saveCartToDB(guestCart)
        res.status(200).json(cart)
      }
    } else {
      if (userCart) {
        res.status(200).json(userCart)
        return
      }
      res.status(404).json({ message: 'guestCart not found' })
    }
  } catch (error) {
    console.log(error)
  }
}

export const cartController = {
  addToCart,
  updateProductProductQuantity,
  deleteCart,
  getCart,
  mergeCart,
}
