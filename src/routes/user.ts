import express from 'express';
import { register, login, me } from '../controllers/user';

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/me', me);

// userRouter.get('/logout', logout);

export default userRouter;
