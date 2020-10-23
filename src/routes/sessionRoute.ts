import express from 'express';
import { UserCredentialsInterface, UserDTOInterface } from '../interfaces/User.interface';
import userService from '../services/userService';
import sessionService from '../services/sessionService';
import facebookService from '../services/facebookService';

const router = express.Router();

router.post('/', async (req, res, next) => {
    const userCredentials: UserCredentialsInterface = req.body;
    try {
        const user: UserDTOInterface = await userService.checkUserCredentials(userCredentials);

        if (user) {
            const token = sessionService.createToken(user);
            const cookie = sessionService.createCookie(token);
            res.setHeader('set-cookie', cookie);
            res.json(user);
        }
    } catch (e) {
        next(e);
    }
});

router.get('/', sessionService.authMiddleware, async (_req, res) => {
    res.send('sessionvalid');
});

router.get('/oauth_facebook', async (req, res) => {
    let { code, state } = req.query;
    code = (code ? code : '') as string;
    state = (state ? state : '') as string;

    const access_token = await facebookService.getAccessToken('/api/session/oauth_facebook', code, state);
    const profileInfo = await facebookService.getProfileInfo(access_token);

    res.json(profileInfo);
});

router.post('/logout', sessionService.authMiddleware, async (req, res) => {
    req.user = undefined;
    res.setHeader('Set-Cookie', 'Authorization=;Max-age=0');
    res.sendStatus(200);
});

export default router;
