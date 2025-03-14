import { z } from 'zod'

const CartItemValidator = z.object({
  productId: z.string().uuid(),
  name: z.string().min(1, 'Name is required'),
  price: z.number().min(0, 'Price must be a positive number'),
  image: z.string().url('Image must be a valid URL'),
  size: z.string().min(1, 'Size is required'),
  color: z.string().min(1, 'Color is required'),
  quantity: z.number().min(1, 'Quantity must be at least 1').default(1),
})

const CartValidator = z.object({
  user: z.string().uuid(),
  guestId: z.string().optional(),
  products: z.array(CartItemValidator),
  totalPrice: z.number().min(0, 'Total price must be a positive number'),
})

export { CartItemValidator, CartValidator }
