import express from 'express';
import { bookAppointment, cancelAppointment, chapaPayment, getAppointments, getUserProfile, loginUser, registerUser, updateUserProfile, verifyPayment } from '../controllers/user.controller.js';
import authUser from '../middleware/authUser.middleware.js';
import upload from '../middleware/multer.js';

const userRouter = express.Router();

// User registration
userRouter.post('/register', registerUser);

// User login
userRouter.post('/login', loginUser);

// User profile
userRouter.get('/get-profile', authUser, getUserProfile);
// update user profile
userRouter.post('/update-profile', upload.single("image"), authUser, updateUserProfile);

// book appointment
userRouter.post('/book-appointment', authUser, bookAppointment);
userRouter.get('/appointments', authUser, getAppointments);
userRouter.post('/cancel-appointment', authUser, cancelAppointment);
// Route to initialize payment
userRouter.post('/initialize-payment', chapaPayment);
// Route to handle payment verification
userRouter.get("/payment-callback", verifyPayment)
// userRouter.get("/payment-success", authUser, successPayment)



export default userRouter;