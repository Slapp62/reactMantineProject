import { Router } from 'express';
import { Business, User, Jobseeker } from '../models/schemas.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const userRouter = Router();

const createNewUser = async (email, password, userType) => {
    const existingUser = await User.findOne({email});
    if (existingUser) {
        throw new Error ('User already exists');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
        email,
        password: hashedPassword,
        userType: userType
    });

    return await newUser.save();
}

userRouter.post('/register/business', async (req, res) => {
    try {
        const {
            email, password, userType,
            companyName, industry, city, description, logo, website, socialLinks
        } = req.body
        
        const savedUser = await createNewUser(email, password, userType);
        
        const newBusiness = new Business({
            userId: savedUser._id,
            companyName, 
            industry, 
            city, 
            description, 
            logo, 
            website, 
            socialLinks
        })

        const savedBusiness = await newBusiness.save();

        // eslint-disable-next-line no-unused-vars
        const {password: userPassword, ...userNoPassword} = savedUser.toObject();

        res.status(201).json({
            message: 'Business registered successfully',
            user: {
                userNoPassword,
                savedBusiness
            }
        });

    } catch (error){
        console.error(error);
        res.status(500).json({error: 'Internal server error'});
    } 
})

userRouter.post('/register/jobseeker', async (req, res) => {
    try {
        const {
            email, password, userType,
            region, city, industry, preferredWorkArr, description, linkedIn
        } = req.body
        
        const savedUser = await createNewUser(email, password, userType);
        
        const newJobseeker = new Jobseeker({
            userId: savedUser._id,
            region, 
            city, 
            industry, 
            preferredWorkArr, 
            description, 
            linkedIn
        })

        const savedJobseeker = await newJobseeker.save();

        // eslint-disable-next-line no-unused-vars
        const {password: userPassword, ...userNoPassword} = savedUser.toObject();

        res.status(201).json({
            message: 'Jobseeker registered successfully',
            user: {
                userNoPassword,
                savedJobseeker
            }
        });

    } catch (error){
        console.error(error);
        res.status(500).json({error: 'Internal server error'});
    } 
})

userRouter.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        
        if (!user) {
            return res.status(401).json({error: 'Invalid email'});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({error: 'Invalid password'});
        }

        const token = jwt.sign(
            { 
                userId: user._id, 
                email: user.email
            }, 
            process.env.JWT_SECRET,
            { expiresIn: '24h'}
        );

        let userData;

        if (user.userType === 'business') {
            userData = await Business.findOne({userId: {$eq: user._id}})
        }

        if (user.userType === 'jobseeker') {
            userData = await Jobseeker.findOne({userId: {$eq: user._id}})
        }

        res.json({
            message: 'Login successful',
            token,
            user: userData
        });

    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

userRouter.get('/', async (_req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
});

export default userRouter;