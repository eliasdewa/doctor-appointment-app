import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import doctorModel from "../models/doctors.model.js";
import appointmentModel from "../models/appointment.model.js";

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if required fields are provided
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }
    // Check if email is valid
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }
    // check if password is strong
    if (password.length < 6) {
      return res.status(404).json({
        success: false,
        message: "Password should be at least 6 characters long",
      });
    }
    // Check if email already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists!" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // create a new user
    const userData = {
      name,
      email,
      password: hashedPassword,
    };
    // Save the user to the database
    const newUser = new userModel(userData);
    const user = await newUser.save();
    // Create a token for the new user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // return a success response
    return res
      .status(201)
      .json({ success: true, message: "User registered successfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Login a user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if required fields are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }
    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });
    }
    // Create a token for the user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    // return a success response
    return res
      .status(200)
      .json({ success: true, message: "User logged in successfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// user profile
const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    // find the user
    const userData = await userModel.findById(userId).select("-password");
    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    // return the user profile
    return res.status(200).json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// update user profile
const updateUserProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dateOfBirth, gender } = req.body;
    const imageFile = req.file;
    if (!name || !phone || !dateOfBirth || !gender) {
      return res.status(400).json({ success: false, message: "Data Missing!" });
    }
    // update user profile
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dateOfBirth,
      gender,
    });
    // update user image
    if (imageFile) {
      // upload image file to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUpload.secure_url;
      // update the user image in the database
      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
      // cleanup: remove uploaded file from local storage
      fs.unlinkSync(req.file.path);
    }
    // return the updated user profile
    const updatedUserData = await userModel
      .findById(userId)
      .select("-password");
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      updatedUserData,
    });
  } catch (error) {
    console.log(error);
    // Cleanup: Remove file if Cloudinary upload fails
    if (req.file) fs.unlinkSync(req.file.path);
    res.status(500).json({ success: false, message: error.message });
  }
};

// book appointment
const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;
    // ge doctor data using docId
    const docData = await doctorModel.findById(docId).select("-password");
    // check if doctor available or not
    if (!docData.available) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not available" });
    }
    // let get slot booking data from docData
    let slots_booked = docData.slots_booked;
    // check if the slot is available
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res
          .status(404)
          .json({ success: false, message: "Slot not available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }
    // get user data using userId
    const userData = await userModel.findById(userId).select("-password");
    // delete slots booked from user data
    delete docData.slots_booked;
    // add new appointment data to user data
    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotDate,
      slotTime,
      date: Date.now()
    }
    // save appointment data to database
    const newAppointmentData = new appointmentModel(appointmentData);
    await newAppointmentData.save();
    // save new slots data in docData
    await doctorModel.findByIdAndUpdate(docId, {slots_booked})
    // return success response
    return res.status(200).json({ success: true, message: "Appointment booked successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  bookAppointment,
};
