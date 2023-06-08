import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

import Product from './models/products.js';
import { connectDB } from './db/connect.js';
import jsonProducts from './data/products.json' assert { 'type': 'json' };


const app = express()
dotenv.config()

const start = async () => {
  try {
    connectDB()

    await Product.deleteMany()
    await Product.create(jsonProducts)
    console.log("Populate connected successfully");
    process.exit(0)
  } catch (error) {
    console.log(error);
  }
}

start()