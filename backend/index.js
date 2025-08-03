/* eslint-disable no-unused-vars */
import express, { json } from "express";
import cors from "cors";
import { connect } from "mongoose";
import userRouter from "./routes/users.js";
import listingRouter from "./routes/listings.js";
import authRouter from "./routes/auth.js";
import dotenv from "dotenv";
import chalk from "chalk";
import { handleError } from "./utils/errorHandler.js";
import { generalRateLimit, authRateLimit, registrationRateLimit, createRateLimit } from "./middleware/rateLimiting.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// connection to database
const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URI);
    console.log(chalk.green.bold("MongoDB connected"));
  } catch (error) {
    console.error("MongoDB connection error", error);
    process.exit(1);
  }
};
connectDB();

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'https://israjobs.onrender.com',
      process.env.FRONTEND_URL
    ].filter(Boolean);
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(json({ limit: '10mb' })); // Limit request body size

// Apply general rate limiting to all routes
app.use(generalRateLimit);

// Apply specific rate limiting to auth routes
app.use("/api/auth/login", authRateLimit);
app.use("/api/auth/register", registrationRateLimit);

// Apply rate limiting to creation endpoints
app.use("/api/listings/create", createRateLimit);

// API routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/listings", listingRouter);

// error handler
app.use((error, req, res, next) => {
  handleError(res, error.status || 500, error.message);
});

// listen
app.listen(PORT, () => {
  console.log(chalk.yellow.bold(`server running on port ${PORT}`));
});
