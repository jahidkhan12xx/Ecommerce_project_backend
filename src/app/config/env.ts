import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

const envConfig = {
  port: process.env.PORT,
  dbURL: process.env.DATABASE_URL,
  secretKey: process.env.JWT_SECRET,
}

if (!envConfig.dbURL) {
  console.log('Database URL not found in.env file. Please add it.')
}

export default envConfig
