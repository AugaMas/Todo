import app from '../app';
import supertest from 'supertest';
import helper from './test_helper';
import { UserInterface } from '../interfaces/User.interface';

const api = supertest(app);

describe('/api/user', () => {
    const userMock: UserInterface = { username: 'Testas', name: 'Testas', password: 'testas' };
    beforeEach(async () => {
        await helper.cleanDatabase();
    });

    describe('POST /', () => {
        test('Should create new user', async () => {
            await api
                .post('/api/user')
                .send(userMock)
                .expect(200)
                .expect('Content-Type', /application\/json/);
            const users = await helper.usersInDb();

            expect(users).toHaveLength(1);
            expect(users[0]).toEqual(expect.objectContaining({ username: userMock.username, name: userMock.name }));
        });

        test('Should not create new user because name is taken', async () => {
            await helper.createUser(userMock);

            const result = await api
                .post('/api/user')
                .send(userMock)
                .expect(400)
                .expect('Content-Type', /application\/json/);
            const users = await helper.usersInDb();

            expect(users).toHaveLength(1);
            expect(result.body.error).toContain('`username` to be unique');
        });
    });

    describe('GET /', () => {
        test('Should return emty array', async () => {
            const result = await api
                .get('/api/user/')
                .expect(200)
                .expect('Content-Type', /application\/json/);

            expect(result.body).toHaveLength(0);
        });

        test('Should return users', async () => {
            await helper.createUser(userMock);

            const result = await api
                .get('/api/user/')
                .expect(200)
                .expect('Content-Type', /application\/json/);

            expect(result.body).toHaveLength(1);
            expect(result.body[0]).toEqual(
                expect.objectContaining({ username: userMock.username, name: userMock.name }),
            );
        });
    });

    describe('GET /:id', () => {
        test('Should return user by id', async () => {
            await helper.createUser(userMock);
            const users = await helper.usersInDb();
            const id = users[0].id;

            const result = await api
                .get(`/api/user/${id}`)
                .expect(200)
                .expect('Content-Type', /application\/json/);

            expect(result.body).toEqual(expect.objectContaining({ username: userMock.username, name: userMock.name }));
        });

        test('Should not found user because bad format id', async () => {
            await helper.createUser(userMock);
            const users = await helper.usersInDb();
            const id = users[0].id;

            const result = await api.get(`/api/user/${id + 'l'}`).expect(400);

            expect(result.body.error).toContain('malformatted id');
        });
    });

    describe('PUT /', () => {
        test('Should update user', async () => {
            await helper.createUser(userMock);
        });
    });
});

afterAll(() => {
    helper.closeDatabaseConnection();
});
