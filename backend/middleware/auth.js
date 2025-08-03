import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const verifyToken = (req, res, next) => {  
  const authHeader = req.headers.authorization;
  
  // Check for proper Bearer token format
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Invalid authorization header format. Expected 'Bearer <token>'" });
  }
  
  // Extract token after 'Bearer '
  const token = authHeader.substring(7);
  
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: "Token expired" });
    } else if (err.name === 'JsonWebTokenError') {
      return res.status(403).json({ error: "Invalid token" });
    } else {
      return res.status(500).json({ error: "Token verification failed" });
    }
  }
};

// Utility function to validate MongoDB ObjectId
export const validateObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return false;
  }
  return true;
};

// Middleware to validate ObjectId parameters
export const validateObjectIdParam = (paramName = 'id') => {
  return (req, res, next) => {
    const id = req.params[paramName];
    if (!validateObjectId(id)) {
      return res.status(400).json({ error: `Invalid ${paramName} format` });
    }
    next();
  };
};