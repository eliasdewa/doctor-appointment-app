import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctors.model.js";
import jwt from "jsonwebtoken";
import fs from "fs";
import appointmentModel from "../models/appointment.model.js";
import userModel from "../models/user.model.js";

// add a doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      specialty,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;
    // check if all fields are required
    if (!imageFile) {
      return res
       .status(404)
       .json({ success: false, message: "Please upload an image" });
    }
    if (
      !name ||
      !email ||
      !password ||
      !specialty ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res
        .status(404)
        .json({ success: false, message: "All fields are required" });
    }
    // Validate the emil format
    if (!validator.isEmail(email)) {
      return res
        .status(404)
        .json({ success: false, message: "Please enter a valid email" });
    }
    // check if email already exists
    const existingDoctor = await doctorModel.findOne({ email });
    if (existingDoctor) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists!" });
    }
    // check if password is strong
    if (password.length < 6) {
      return res.status(404).json({
        success: false,
        message: "Password should be at least 6 characters long",
      });
    }
    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // upload image to the cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const imageUrl = imageUpload.secure_url;
    // Cleanup: Remove uploaded file from local storage
    fs.unlinkSync(req.file.path);
    // create a new doctor
    const doctorData = {
      name,
      email,
      password: hashedPassword,
      specialty,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
      image: imageUrl,
    };
    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();
    res
      .status(201)
      .json({ success: true, message: "Doctor added successfully" });
  } catch (error) {
    console.log(error);
    // Cleanup: Remove file if Cloudinary upload fails
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin login
const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // create token for admin
      const token = jwt.sign(
        process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD,
        process.env.JWT_SECRET
      );

      res.status(200).json({
        success: true,
        message: "Admin logged in successfully",
        token,
      });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all doctors
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all appointments
const allAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.status(200).json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
// To cancel the appointment by admin
const appointmentCancelled = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    // find the appointment data using the appointment id
    const appointmentData = await appointmentModel.findById(appointmentId);
    
    // make the appointment cancel boolean to true
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });
    // Releasing doctor slot
    const { docId, slotDate, slotTime } = appointmentData;
    // get the doctor data from docId
    const doctorData = await doctorModel.findById(docId);
    // Get the doctor slot data
    let slots_booked = doctorData.slots_booked;
    // add the slot back to the doctor's slots booked
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );
    // update the doctor's slots booked data
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    // return success response
    return res
      .status(200)
      .json({ success: true, message: "Appointment cancelled" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// get dashboard data for admin panel
const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({})
    const users = await userModel.find({})
    const appointments = await appointmentModel.find({})

    const dashboardData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments: appointments.reverse().slice(0, 5)
    }
    res.status(200).json({ success: true, dashboardData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addDoctor, adminLogin, allDoctors, allAppointments, appointmentCancelled, adminDashboard };
