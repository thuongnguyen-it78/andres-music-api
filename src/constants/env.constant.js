require('dotenv').config()
export const DATABASE_URL = process.env.DATABASE_URL
export const PORT = process.env.PORT || 3005
export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET

export const isProduction = process.env.NODE_ENV === 'production'
