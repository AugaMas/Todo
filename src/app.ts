import express from 'express';
import router from './routes/router';
import { middleware } from './utils/middleware';
import 'express-async-errors';
import './mongo';

const app = express();

app.use(express.json());

app.use('/api', router);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
