import dotenv from 'dotenv/config'

export const PORT = process.env.PORT || 3000;

export const JWT_SECRET = process.env.JWT_SECRET

export const FRONT_URL = process.env.FRONT_URL || 'http://localhost:5173'