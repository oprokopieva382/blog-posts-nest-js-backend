import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
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

  describe('1. (POST) - CREATE POST', () => {
    it('1. Should create post and return  status code of 201', async () => {
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

      //create blog
      const newBlog = {
        name: 'Promise',
        description: 'do you know promise?',
        websiteUrl: 'https://google.com',
      };

      const blog = await request(app.getHttpServer())
        .post('/blogs')
        .send(newBlog)
        .auth('admin', 'qwerty')
        .expect(201);

      //create post
      const newPost = {
        title: 'Refactor',
        shortDescription: 'Learn more about refactor in ' + new Date(),
        content: 'whole content about refactor',
        blogId: blog.body.id,
      };

      await request(app.getHttpServer())
        .post('/posts')
        .send(newPost)
        .auth('admin', 'qwerty')
        .expect(201);
    });

    it("2. Shouldn't create post and return  status code of 400", async () => {
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

      //create blog
      const newBlog = {
        name: 'Promise',
        description: 'do you know promise?',
        websiteUrl: 'https://google.com',
      };

      const blog = await request(app.getHttpServer())
        .post('/blogs')
        .send(newBlog)
        .auth('admin', 'qwerty')
        .expect(201);

      //create post
      const newPost = {
        title: '',
        shortDescription: '',
        content: 'whole content about refactor',
        blogId: blog.body.id,
      };

      const res = await request(app.getHttpServer())
        .post('/posts')
        .send(newPost)
        .auth('admin', 'qwerty')
        .expect(400);

      expect(res.body.errorsMessages.length).toBe(2);
    });

    it("3. Shouldn't create blog if unauthorized and return  status code of 401", async () => {
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

      //create blog
      const newBlog = {
        name: 'Promise',
        description: 'do you know promise?',
        websiteUrl: 'https://google.com',
      };

      const blog = await request(app.getHttpServer())
        .post('/blogs')
        .send(newBlog)
        .auth('admin', 'qwerty')
        .expect(201);

      //create post
      const newPost = {
        title: 'Refactor',
        shortDescription: 'Learn more about refactor in ' + new Date(),
        content: 'whole content about refactor',
        blogId: blog.body.id,
      };

      await request(app.getHttpServer())
        .post('/posts')
        .send(newPost)
        .auth('admin1', 'qwerty1')
        .expect(401);
    });
  });
});
