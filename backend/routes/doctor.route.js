import express from "express";
import { doctorList } from "../controllers/doctors.controller.js";

const doctorRouter = express.Router();

// get doctors
doctorRouter.get("/list", doctorList);

export default doctorRouter;
