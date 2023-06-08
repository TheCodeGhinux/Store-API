import mongoose, { mongo } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name:{
      type: String,
      required: [true, 'Please provide a product name']
    },
    price:{
      type: Number,
      required: [true, 'Please provide a product price']
    },
    featured:{
      type: Boolean,
      default: false
    },
    rating:{
      type: Number,
      default: 4.0
    },
    createdAt:{
      type: Date,
      default: Date.now()
    },
    company:{
      type: String,
      enum: {
        values: ['GHAJ', 'GIY', 'NEUS', 'TCG'],
        message: '{VALUE} is not supported'
      },
    }
  }
)

export default mongoose.model('Products', productSchema)