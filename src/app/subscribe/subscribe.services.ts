import subscriberModel from './subscribe.model'

const subscribe = async (email: string) => {
  const res = await subscriberModel.create({ email })
  return res
}

const findSubscriber = async (email: string) => {
  const res = await subscriberModel.findOne({ email })
  return res
}

export const subscribeServices = {
  findSubscriber,
  subscribe,
}
