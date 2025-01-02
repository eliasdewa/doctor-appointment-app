import jwt from "jsonwebtoken";

// doctor authentication middleware
const authDoctor = async (req, res, next) => {
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
    const doctorToken = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    // Ensure the token is not null
    if (!doctorToken) {
      return res
        .status(401)
        .json({ success: false, message: "No doctor token provided" });
    }
    // Verify the doctor token
    const token_decoded = jwt.verify(doctorToken, process.env.JWT_SECRET);
    // Add the doctor ID to the request body
    req.body.docId = token_decoded.id;
    next();

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export default authDoctor;