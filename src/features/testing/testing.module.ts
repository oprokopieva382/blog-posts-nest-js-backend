import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from '../comment/schemas/Comment.schema';
import { Blog, BlogSchema } from '../blog/schemas/Blog.schema';
import { User, UserSchema } from '../user/schemas/User.schema';
import { TestingController } from './testing.controller';
import { Post, PostSchema } from '../post/schemas/Post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: PostSchema,
      },
      {
        name: Comment.name,
        schema: CommentSchema,
      },
      {
        name: Blog.name,
        schema: BlogSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [TestingController],
  providers: [],
})
export class TestingModule {}
