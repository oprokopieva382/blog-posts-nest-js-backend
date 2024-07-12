import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BlogService } from './features/blog/blog.service';
import { BlogRepository } from './features/blog/blog.repository';
import { BlogController } from './features/blog/blog.controller';
import { CommentService } from './features/comment/comment.service';
import { CommentRepository } from './features/comment/comment.repository';
import { CommentController } from './features/comment/comment.controller';
import { UserModule } from './features/user/user.module';
import { PostModule } from './features/post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_DB_ATLAS'),
        dbName: configService.get<string>('DB_NAME'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    PostModule,
  ],
  controllers: [BlogController, CommentController],
  providers: [BlogService, CommentService, BlogRepository, CommentRepository],
})
export class AppModule {}
