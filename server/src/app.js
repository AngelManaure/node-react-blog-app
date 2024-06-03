import express from 'express'
import morgan from 'morgan'
import cookieParser from "cookie-parser";
import cors from 'cors'

import { FRONT_URL } from "./config.js";
import authRoutes from './routes/auth.routes.js'
import postRoutes from './routes/post.routes.js'

const app = express()

app.use(cors({
    origin: FRONT_URL,
    credentials: true
}));

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use('/api', authRoutes)
app.use('/api', postRoutes)

export default app