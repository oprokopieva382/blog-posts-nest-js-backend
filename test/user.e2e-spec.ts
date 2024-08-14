import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { applyAppSettings } from '../src/settings/apply-app-settings';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('user tests', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    applyAppSettings(app);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(async () => {
    await request(app.getHttpServer()).delete('/testing/all-data').expect(204);
  });

  describe('1. (POST) - CREATE USER', () => {
    it('1. Should create user and return status code 200', async () => {
      const newUser = {
        login: 'Tina',
        password: 'tina123',
        email: 'Tina@gmail.com',
      };

      const res = await request(app.getHttpServer())
        .post('/users')
        .send(newUser)
        .auth('admin', 'qwerty')
        .expect(201);

      expect(res.body).toEqual({
        email: newUser.email,
        login: newUser.login,
        createdAt: expect.any(String),
        id: expect.any(String),
      });
    });

    it("2. Shouldn't create user and return status code 400 if input has incorrect values", async () => {
      const newUser = {
        login: '',
        password: '',
        email: '',
      };

      const res = await request(app.getHttpServer())
        .post('/users')
        .send(newUser)
        .auth('admin', 'qwerty')
        .expect(400);

      expect(res.body.errorsMessages.length).toBe(3);
    });

    it("3. Shouldn't create user and return status code 401 if admin unauthorized", async () => {
      const newUser = {
        login: 'Tina',
        password: 'tina123',
        email: 'Tina@gmail.com',
      };

      await request(app.getHttpServer())
        .post('/users')
        .send(newUser)
        .auth('admin', 'qwerty1')
        .expect(401);
    });
  });

  describe('1. (GET) - GET USERS', () => {
    it('1. Should get users and return status code 200 and object with pagination', async () => {
      //create user
      const newUser = {
        login: 'Tina',
        password: 'tina123',
        email: 'Tina@gmail.com',
      };
      await request(app.getHttpServer())
        .post('/users')
        .send(newUser)
        .auth('admin', 'qwerty')
        .expect(201);

      //get user
      const res = await request(app.getHttpServer())
        .get('/users')
        .auth('admin', 'qwerty')
        .expect(200);

      expect(res.body.page).toBe(1);
      expect(res.body.pageSize).toBe(10);
    });

    it("2. Shouldn't get users and return status code 401 if unauthorized", async () => {
      //create user
      const newUser = {
        login: 'Tina',
        password: 'tina123',
        email: 'Tina@gmail.com',
      };
      await request(app.getHttpServer())
        .post('/users')
        .send(newUser)
        .auth('admin', 'qwerty')
        .expect(201);

      //get user
      await request(app.getHttpServer())
        .get('/users')
        .auth('admin1', 'qwerty1')
        .expect(401);
    });
  });
});
