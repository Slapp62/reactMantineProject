import express, { json } from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import userRouter from './routes/users.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const connectDB = async () => {
    try {
        await connect(process.env.MONGO_URI);
        console.log('MongoDB URI', process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error', error);
        process.exit(1);
    }
}
connectDB();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(json());

app.use('/api/users', userRouter);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})

