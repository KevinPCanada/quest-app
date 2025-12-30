import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  // Get token from cookies
  const token = req.cookies.access_token;

  // Check if token exists
  if (!token) {
    return res.status(403).json("Access denied. No token provided.");
  }

   // Verify the token
  try {
    const decoded = jwt.verify(token, "jwtkey"); // "jwtkey" should be stored in an environment variable in production
    req.user = decoded; // Store user info in req object
    next(); // Pass control to the next handler
  } catch (error) {
    return res.status(401).json("Invalid token.");
  }
};