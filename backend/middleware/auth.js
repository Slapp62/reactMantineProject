import jwt from "jsonwebtoken";

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