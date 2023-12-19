import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import errormiddleware from './middleWare/errorMiddleware.js';
import passport from './config/PassportConfig.js';
import userRouter from './Router/user.router.js';
import postRouter from './Router/post.router.js';

const app = express();
dotenv.config({ path: './config/.env' });

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter);
app.use('/post', postRouter)


app.use(passport.initialize());
app.use(errormiddleware);

app.listen(process.env.PORT, () => {
    console.log(` server is runnning on port :${process.env.PORT}`)
})