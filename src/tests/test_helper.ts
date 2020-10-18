import mongoose from 'mongoose';
import User from '../models/user';
import userService from '../services/userService';
import { UserInterface } from '../interfaces/User.interface';

function cleanDatabase() {
    if (!mongoose.connection.name.includes('testing')) {
        throw new Error(`Cannot delete data from ${mongoose.connection.name} it is not testing database`);
    }

    return Promise.all([User.deleteMany({})]);
}

async function usersInDb() {
    return await userService.getUsers();
}

async function createUser(user: UserInterface) {
    await userService.createUser(user);
}

function closeDatabaseConnection(): void {
    mongoose.connection.close();
}

const helper = { cleanDatabase, usersInDb, closeDatabaseConnection, createUser };
export default helper;
