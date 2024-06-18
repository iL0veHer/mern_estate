import jwt from 'jsonwebtoken';
import errorHandler from './error.js';

export const verifiedToken = (req, res, next) => {
    const token = req.cookie.access_token;

    if (!token) return next(new errorHandler(401, 'unauthorized'));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, 'Forbidden'));

        req.user = user;
        next();
    });
};
