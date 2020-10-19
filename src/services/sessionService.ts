import { Request, Response, NextFunction } from 'express';
import config from '../utils/config';
import { TokenDataInterface, DataStoredInToken } from '../interfaces/Token.interface';
import { UserDTOInterface } from '../interfaces/User.interface';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import AuthenticationTokenMissingException from '../exceptions/AuthenticationTokenMissingException';
import WrongAuthenticationToken from '../exceptions/WrongAuthenticationToken';

function createToken(user: UserDTOInterface): TokenDataInterface {
    const { JWT_SECRET } = config;
    const expiresIn: number = 60 * 60 * 24;
    const dataStoredInToken: DataStoredInToken = { _id: user.id };

    return { expiresIn, token: jwt.sign(dataStoredInToken, JWT_SECRET, { expiresIn }) };
}

function createCookie(token: TokenDataInterface): string {
    return `Authorization=${token.token}; HttpOnly; Max-Age=${token.expiresIn}`;
}

async function authMiddleware(req: Request, _res: Response, next: NextFunction) {
    const cookies = req.cookies;
    if (cookies && cookies.Authorization) {
        try {
            const verificationResponse = jwt.verify(cookies.Authorization, config.JWT_SECRET) as DataStoredInToken;
            const id = verificationResponse._id;
            const user = await User.findById(id);
            if (user) {
                req.user = user.toJSON() as UserDTOInterface;
                next();
            } else {
                next(new WrongAuthenticationToken());
            }
        } catch {
            next(new WrongAuthenticationToken());
        }
    } else {
        next(new AuthenticationTokenMissingException());
    }
}

export default { createToken, createCookie, authMiddleware };
