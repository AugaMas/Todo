import express, { Router } from 'express';
import userRoute from './userRoute';

const router: Router = express.Router();

router.use('/user', userRoute);

export default router;
