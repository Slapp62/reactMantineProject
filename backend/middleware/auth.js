import jwt from "jsonwebtoken";
import { User } from "../models/schemas.js";
import bcrypt from "bcryptjs";

export const verifyToken = (req, res, next) => {  
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).send({ error: "Invalid token" });
      }
      req.user = decoded;
      next();
    });
  } else {
    res.status(401).send("No token provided");
  }
};

export const verifyUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
  
    if (!user) {
      return res.status(401).json({ error: "Invalid email" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}