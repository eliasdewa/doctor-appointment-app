import mongoose from "mongoose";

// Connect to MongoDB
export const connectDB = async () => {
  await mongoose.connect(`${process.env.MONGODB_URL}/doctor-appointment`)
  .then(() => console.log('Database connected to MongoDB'));
};