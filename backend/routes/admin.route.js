import express from 'express';
import upload from '../middleware/multer.js';
import { addDoctor, adminDashboard, adminLogin, allAppointments, allDoctors, appointmentCancelled } from '../controllers/admin.controller.js';
import authAdmin from '../middleware/authAdmin.middleware.js';
import { changeAvailability } from '../controllers/doctors.controller.js';

const adminRouter = express.Router();

// Admin login
adminRouter.post('/login', adminLogin);
// add a new doctor
adminRouter.post('/add-doctor', authAdmin, upload.single("image"), addDoctor);
// get all doctors
adminRouter.post('/all-doctors', authAdmin, allDoctors);
// change doctor availability status
adminRouter.post('/change-availability', authAdmin, changeAvailability);
// get all appointments
adminRouter.get('/all-appointments', authAdmin, allAppointments);
// cancel appointment
adminRouter.post('/cancel-appointment', authAdmin, appointmentCancelled);
adminRouter.get('/dashboard', authAdmin, adminDashboard);


export default adminRouter;