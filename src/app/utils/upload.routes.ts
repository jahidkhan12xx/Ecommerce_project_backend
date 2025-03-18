import express, { Response, Router } from 'express'
import multer from 'multer'
import { v2 as cloudinary } from 'cloudinary'
import streamifier from 'streamifier'
import envConfig from '../config/env'
import { AuthenticatedRequest } from '../middlewares/auth.middleware'

const router = express.Router()

// Cloudinary configuration
cloudinary.config({
  cloud_name: envConfig.cloudinary_name,
  api_key: envConfig.cloudinary_api_key,
  api_secret: envConfig.cloudinary_api_secret,
})

// Multer setup (memory storage)
const storage = multer.memoryStorage()
const upload = multer({ storage })

router.post(
  '/',
  upload.single('image'),
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (!req.file) {
        res.status(400).json({ message: 'No file uploaded' })
        return
      }

      const streamUpload = (fileBuffer: Buffer): Promise<any> => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'Jstore' },
            (error, result) => {
              if (result) {
                resolve(result)
              } else {
                reject(error)
              }
            },
          )

          streamifier.createReadStream(fileBuffer).pipe(stream)
        })
      }

      const result = await streamUpload(req.file.buffer)

      res.status(200).json({ imageUrl: result.secure_url })
    } catch (error) {
      console.error('Upload error:', error)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  },
)

export const uploadRouter = router
