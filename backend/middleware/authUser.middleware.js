import jwt from "jsonwebtoken";

// user authentication middleware
const authUser = async (req, res, next) => {
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
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    // Ensure the token is not null
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No user token provided" });
    }
    // Verify the user token
    const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Add the user ID to the request body
    req.body.userId = token_decoded.id;
    next();

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export default authUser;