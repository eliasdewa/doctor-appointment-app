import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

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
    if (!email ||!password) {
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

export { registerUser, loginUser };
