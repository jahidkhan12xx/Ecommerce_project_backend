import mongoose from 'mongoose'
import envConfig from './env'

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(envConfig.dbURL as string)
    console.log('✅ Database connected successfully')
  } catch (error) {
    console.error('❌ Database connection failed:', error)
  }
}

export default connectDB
