import jwt from "jsonwebtoken";

// admin authentication middleware
const authAdmin = async (req, res, next) => {
  try {
    // Extract the Authorization header
    const authHeader = req.headers.authorization;
    // Check if the Authorization header exists
    if (!authHeader) {
      return res
        .status(401)
        .json({ success: false, message: "Authorization header missing" });
    }
    // Extract the token from the Authorization header
    const adminToken = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    // Ensure the token is not null
    if (!adminToken) {
      return res
        .status(401)
        .json({ success: false, message: "No admin token provided" });
    }
    // Verify the admin token
    const token_decoded = jwt.verify(adminToken, process.env.JWT_SECRET);
    if (token_decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.status(403).json({ success: false, message: "Invalid admin token" });
    }
    next();

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export default authAdmin;