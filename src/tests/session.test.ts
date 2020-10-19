import app from '../app';
import supertest from 'supertest';
import helper from './test_helper';
import { UserReqInterface, UserCredentialsInterface } from '../interfaces/User.interface';

const api = supertest(app);

describe('/api/session', () => {
    const userMock: UserReqInterface = { username: 'Testas', name: 'Testas', password: 'testas' };
    const userCredentials: UserCredentialsInterface = { username: userMock.username, password: userMock.password };
    beforeEach(async () => {
        await helper.cleanDatabase();
    });

    describe('POST /', () => {
        test('Should return userDTO and sets cookie', async () => {
            await helper.createUser(userMock);

            const result = await api
                .post('/api/session')
                .send(userCredentials)
                .expect(200)
                .expect('Content-Type', /application\/json/)
                .expect('Set-Cookie', /^Authorization=.+/);

            expect(result.body).toEqual(expect.objectContaining({ username: userMock.username, name: userMock.name }));
        });

        test('Should return 401 status code and error Invalid username or password because wrong password', async () => {
            await helper.createUser(userMock);

            const result = await api
                .post('/api/session')
                .send({ ...userCredentials, password: 'wrongPassword' })
                .expect(401)
                .expect('Content-Type', /application\/json/);

            expect(result.body.error).toContain('Invalid username or password');
        });

        test('Should return 401 status code and error Invalid username or password because user does not exist', async () => {
            const result = await api
                .post('/api/session')
                .send({ userCredentials })
                .expect(401)
                .expect('Content-Type', /application\/json/);

            expect(result.body.error).toContain('Invalid username or password');
        });
    });

    describe('GET /', () => {
        test('Should return session for authenticated user', async () => {
            const user = await helper.createUser(userMock);
            const cookie = helper.createCookie(user);

            const result = await api.get('/api/session').set('Cookie', cookie).expect(200);

            expect(result.text).toContain('sessionvalid');
        });

        test('Should not return session without authentication cookie', async () => {
            const result = await api.get('/api/session').expect(401);

            expect(result.body.error).toContain('Authentication token missing');
        });

        test('Should not return session with not valid authentication cookie', async () => {
            const result = await api.get('/api/session').set('Cookie', 'Authorization=WrongToken').expect(401);

            expect(result.body.error).toContain('Wrong authentication token');
        });
    });

    afterAll(() => {
        helper.closeDatabaseConnection();
    });
});
