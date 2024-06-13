import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import errorHandler from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 12);

    try {
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            newUser,
        });
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email })
        if (!validUser) {
            return next(errorHandler(404, 'User not found'));
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(404, 'Invalid email or password'));
        }

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.TIME,
        });

        const {password:pass,...rest}=validUser._doc

        res.cookie('access_token', token, { httpOnly: true }).status(200).json({
            rest
        })


    } catch (error) {
        next(error);
    }
};
