import express, { Router } from 'express';
import userRoute from './userRoute';
import sessionRoute from './sessionRoute';

const router: Router = express.Router();

router.use('/user', userRoute);
router.use('/session', sessionRoute);

export default router;
