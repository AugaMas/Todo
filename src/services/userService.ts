import User from '../models/user';
import bcrypt from 'bcrypt';
import { UserInterface } from '../interfaces/User.interface';

const saltRound = 10;

async function createUser(user: UserInterface) {
    const passwordHash = await bcrypt.hash(user.password, saltRound);

    const newUser = new User({
        username: user.username,
        name: user.name,
        passwordHash,
    });

    const savedUser = await newUser.save();

    return savedUser;
}

async function getUsers() {
    const users = await User.find({});

    return users.map((u) => u.toJSON());
}

async function getUser(id: string) {
    const user = await User.findById(id);

    return user && user.toJSON();
}

export default { createUser, getUsers, getUser };
