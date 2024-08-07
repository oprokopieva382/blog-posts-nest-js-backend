import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Comment,
  CommentSchema,
} from '../blogs/comment/schemas/Comment.schema';
import { Blog, BlogSchema } from '../blogs/blog/schemas/Blog.schema';
import { User, UserSchema } from '../user/schemas/User.schema';
import { TestingController } from './testing.controller';
import { Post, PostSchema } from '../blogs/post/schemas/Post.schema';
import {
  CommentReaction,
  CommentReactionSchema,
} from '../blogs/comment/schemas/CommentReaction.schema';
import {
  PostReaction,
  PostReactionSchema,
} from '../blogs/post/schemas/PostReaction.schema';

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
      {
        name: CommentReaction.name,
        schema: CommentReactionSchema,
      },
      {
        name: PostReaction.name,
        schema: PostReactionSchema,
      },
    ]),
  ],
  controllers: [TestingController],
  providers: [],
})
export class TestingModule {}
