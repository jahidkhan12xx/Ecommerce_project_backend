import { Response } from 'express'
import { AuthenticatedRequest } from '../middlewares/auth.middleware'
import { subscribeServices } from './subscribe.services'

const subscribeNewletter = async (req: AuthenticatedRequest, res: Response) => {
  const { email } = req.body

  if (!email) {
    res.status(400).json({
      message: 'Email is neccesary',
    })
    return
  }

  try {
    let subscriber = await subscribeServices.findSubscriber(email)
    if (subscriber) {
      res.status(400).json({
        message: 'Already subscribed',
      })
      return
    }
    const newSubscriber = await subscribeServices.subscribe(email)

    res.status(200).json({
      data: newSubscriber,
      message: 'Successfully subscribed to the newsletter',
    })
  } catch (error) {
    console.log(error)
  }
}

export const subscribeController = {
  subscribeNewletter,
}
