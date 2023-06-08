import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB is connected');
  } catch (error) {
    throw error;
  }
};

export const mongoOn = () => {
  mongoose.connection.on('disconnected', () => {
    console.log('Mongodb disconnected');
  });
};

export const mongoOff = () => {
  mongoose.connection.on('connected', () => {
    console.log('Mongodb connected');
  });
};
