import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
dotenv.config({});

mongoose
    .connect(process.env.MONGO)
    .then((e) => {
        console.log('connected to mongoDB');
    })
    .catch((error) => {
        console.log(error);
    });
const app = express();
app.use(express.json())

app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error"
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message,
    })
})

app.listen(3000, () => {
    console.log('guys, I am running. help!!!');
});
