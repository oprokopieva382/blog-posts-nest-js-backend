import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { applyAppSettings } from '../src/settings/apply-app-settings';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('auth tests', () => {
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

//   describe('1. (GET) - GET COMMENT BY ID', () => {
//     it('1. Should get comment by id & return status code 200', async () => {
//       //create user
//       const newUser = {
//         login: 'Tina',
//         password: 'tina123',
//         email: 'Tina@gmail.com',
//       };

//       await request(app.getHttpServer())
//         .post('/users')
//         .send(newUser)
//         .auth('admin', 'qwerty')
//         .expect(201);

//       //login user
//       const loginInput = {
//         loginOrEmail: 'Tina',
//         password: 'tina123',
//       };

//       const res = await request(app.getHttpServer())
//         .post('/auth/login')
//         .send(loginInput)
//         .expect(200);

//       //set accessToken
//       const accessToken = res.body.accessToken;

      
//     });

  
   
//   });
});