import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { UserInterface } from '../interfaces/User.interface';

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    name: String,
    passwordHash: String,
});

userSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    },
});

userSchema.plugin(uniqueValidator);
const User = mongoose.model<UserInterface & mongoose.Document>('User', userSchema);

export default User;
