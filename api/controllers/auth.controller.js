import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signup = async (req, res) => {
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
        res.status(500).json(error.message);
    }
};
