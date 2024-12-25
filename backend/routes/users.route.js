import express from 'express';
import { getUserProfile, loginUser, registerUser, updateUserProfile } from '../controllers/user.controller.js';
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


export default userRouter;