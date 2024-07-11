import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './features/user/user.controller';
import { UserService } from './features/user/user.service';
import { UserRepository } from './features/user/user.repository';
import { BlogService } from './features/blog/blog.service';
import { BlogRepository } from './features/blog/blog.repository';
import { BlogController } from './features/blog/blog.controller';

@Module({
  imports: [],
  controllers: [AppController, UserController, BlogController],
  providers: [
    AppService,
    UserService,
    BlogService,
    UserRepository,
    BlogRepository,
  ],
})
export class AppModule {}
