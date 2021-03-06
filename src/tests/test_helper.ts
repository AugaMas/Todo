import mongoose from 'mongoose';
import User from '../models/user';
import userService from '../services/userService';
import sessionService from '../services/sessionService';
import { UserReqInterface, UserDTOInterface } from '../interfaces/User.interface';

function cleanDatabase() {
    if (!mongoose.connection.name.includes('testing')) {
        throw new Error(`Cannot delete data from ${mongoose.connection.name} it is not testing database`);
    }

    return Promise.all([User.deleteMany({})]);
}

async function usersInDb() {
    return await userService.getUsers();
}

async function createUser(user: UserReqInterface) {
    return (await userService.createUser(user)).toJSON() as UserDTOInterface;
}

function closeDatabaseConnection(): void {
    mongoose.connection.close();
}

function createCookie(user: UserDTOInterface) {
    const token = sessionService.createToken(user);
    return sessionService.createCookie(token);
}

const helper = { cleanDatabase, usersInDb, closeDatabaseConnection, createUser, createCookie };
export default helper;
