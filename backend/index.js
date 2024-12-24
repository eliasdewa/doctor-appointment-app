import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import dotenv from "dotenv";
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/admin.route.js';
import errorMiddleware from './middleware/errorMiddleware.js';
import bodyParser from 'body-parser';
import doctorRouter from './routes/doctor.route.js';
import userRouter from './routes/users.route.js';

// app configuration
const app = express();
dotenv.config();
connectDB(); // Database connection
connectCloudinary(); // Cloudinary connection

// middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  method: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: 'Authorization,Content-Type',
  credentials: true
})); // we can access the backend from any frontend

// api endpoint
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);

// Error handlers middleware
app.use(errorMiddleware);

// port Listener
const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));