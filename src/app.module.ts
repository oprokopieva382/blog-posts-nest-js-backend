import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './features/user/user.module';
import { PostModule } from './features/post/post.module';
import { BlogModule } from './features/blog/blog.module';
import { CommentModule } from './features/comment/comment.module';

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
    CommentModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
