import dotenv from 'dotenv';

dotenv.config();

interface Config {
    PORT: string | number;
    MONGODB_URI: string;
    SITE_ORIGIN: string;
    JWT_SECRET: string;
    FACEBOOK_SECRET?: string;
    FACEBOOK_APP_ID?: string;
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
    SITE_ORIGIN: process.env.SITE_ORIGIN || `http://localhost:${process.env.PORT || 3000}`,
    JWT_SECRET: process.env.JWT_SECRET || 'itsSecret',
    FACEBOOK_SECRET: process.env.FACEBOOK_SECRET,
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
};

export default config;
