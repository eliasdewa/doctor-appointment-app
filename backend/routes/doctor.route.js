import express from "express";
import { appointmentCancelled, appointmentCompleted, doctorDashboard, doctorList, doctorProfile, getDoctorAppointments, loginDoctor, updateDoctorProfile } from "../controllers/doctors.controller.js";
import authDoctor from "../middleware/authDoctor.middleware.js";

const doctorRouter = express.Router();

// get doctors
doctorRouter.get("/list", doctorList);
doctorRouter.post("/login", loginDoctor);
doctorRouter.get("/doctor-appointments", authDoctor, getDoctorAppointments);
doctorRouter.post("/complete-appointment", authDoctor, appointmentCompleted);
doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancelled);
doctorRouter.get("/dashboard", authDoctor, doctorDashboard);
doctorRouter.get("/profile", authDoctor, doctorProfile);
doctorRouter.post("/update-profile", authDoctor, updateDoctorProfile);


export default doctorRouter;
