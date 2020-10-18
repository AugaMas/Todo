import dotenv from 'dotenv';

dotenv.config();

interface Config {
    PORT: string | number;
    MONGODB_URI: string;
}

let MONGODB_URI: string;

switch (process.env.NODE_ENV) {
    case 'test':
        MONGODB_URI = process.env.MONGODB_URI_TESTING || 'mongodb://127.0.0.1:27017/testing';
        break;
    case 'development':
        MONGODB_URI = process.env.MONGODB_DEV_URI || 'mongodb://127.0.0.1:27017/todoDEV';
        break;
    case 'production':
        MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/todo';
        break;
    default:
        MONGODB_URI = process.env.MONGODB_DEV_URI || 'mongodb://127.0.0.1:27017/todoDEV';
}

const config: Config = {
    PORT: process.env.PORT || 3000,
    MONGODB_URI,
};

export default config;
