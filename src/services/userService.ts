import User from '../models/user';
import bcrypt from 'bcrypt';
import WrongUserCredentialsException from '../exceptions/WrongUserCredentialsException';
import { UserReqInterface, UserCredentialsInterface } from '../interfaces/User.interface';

const saltRound = 10;

async function createUser(user: UserReqInterface) {
    const passwordHash = await bcrypt.hash(user.password, saltRound);

    const newUser = new User({
        username: user.username,
        name: user.name,
        passwordHash,
    });

    const savedUser = await newUser.save();

    return savedUser;
}

async function checkUserCredentials(userCredentials: UserCredentialsInterface) {
    const user = await User.findOne({ username: userCredentials.username });
    if (user) {
        const isPasswordMatching = await bcrypt.compare(userCredentials.password, user.passwordHash);
        if (isPasswordMatching) return user.toJSON();
        else {
            throw new WrongUserCredentialsException();
        }
    }
    throw new WrongUserCredentialsException();
}

async function getUsers() {
    const users = await User.find({});
    return users.map((u) => u.toJSON());
}

async function getUser(id: string) {
    const user = await User.findById(id);

    return user && user.toJSON();
}

export default { createUser, getUsers, getUser, checkUserCredentials };
