import express  from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import 'express-async-errors'


import productRoute from './routes/productRoutes.js'

import notFoundMiddleware from './middleware/NotFound.js'
import errorHandlerMiddleware from './middleware/errorHandler.js'
import { connectDB, mongoOff, mongoOn } from './db/connect.js'


const app = express()
dotenv.config()

mongoOn
mongoOff

// Middlewares
app.use(express.json())

// Routes
app.use('/api/v1/products', productRoute)

// Middlewares
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 5001
app.listen(port, () => {
  connectDB()
  console.log(`Server connected on port ${port}`);
})