import express from 'express'
import { subscribeController } from './subscribe.controller'

const router = express.Router()

router.post('/', subscribeController.subscribeNewletter)

export const subscriberRoutes = router
