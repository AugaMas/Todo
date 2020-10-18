import express, { Router } from 'express';
import userService from '../services/userService';
import { UserInterface } from '../interfaces/User.interface';

const router: Router = express.Router();

router.get('/', async (_req, res, next) => {
    try {
        const users = await userService.getUsers();
        res.json(users);
    } catch (e) {
        next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await userService.getUser(id);

        res.json(user);
    } catch (e) {
        next(e);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const user: UserInterface = req.body;

        const newUser = await userService.createUser(user);

        res.json(newUser);
    } catch (e) {
        next(e);
    }
});

export default router;
