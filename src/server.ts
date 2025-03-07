import app from './app'
import envConfig from './app/config/env'
import connectDB from './app/config/db'

// Start the server

async function startServer() {
  try {
    connectDB()
    app.listen(envConfig.port, () => {
      console.log(`✅ Server running on port ${envConfig.port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

startServer()
