import express from "express";
import { appointmentCancelled, appointmentCompleted, doctorList, getDoctorAppointments, loginDoctor } from "../controllers/doctors.controller.js";
import authDoctor from "../middleware/authDoctor.middleware.js";

const doctorRouter = express.Router();

// get doctors
doctorRouter.get("/list", doctorList);
doctorRouter.post("/login", loginDoctor);
doctorRouter.get("/doctor-appointments", authDoctor, getDoctorAppointments);
doctorRouter.post("/complete-appointment", authDoctor, appointmentCompleted);
doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancelled);


export default doctorRouter;
