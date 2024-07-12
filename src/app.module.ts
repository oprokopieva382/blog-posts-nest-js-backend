import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommentService } from './features/comment/comment.service';
import { CommentRepository } from './features/comment/comment.repository';
import { CommentController } from './features/comment/comment.controller';
import { UserModule } from './features/user/user.module';
import { PostModule } from './features/post/post.module';
import { BlogModule } from './features/blog/blog.module';

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
    BlogModule,
  ],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
})
export class AppModule {}
