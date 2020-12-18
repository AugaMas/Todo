import mongoose from 'mongoose';
import logger from './utils/logger';
import config from './utils/config';

mongoose
    .connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((_result) => {
        logger.info('connected to MongoDB');
    })
    .catch((error: Error) => {
        logger.error('error connecting to MongoDB:', error.message);
    });
