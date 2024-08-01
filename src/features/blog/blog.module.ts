import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './schemas/Blog.schema';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { BlogRepository } from './blog.repository';
import { BlogQueryRepository } from './blog.query.repository';
import { Post, PostSchema } from '../post/schemas/Post.schema';
import {
  PostReaction,
  PostReactionSchema,
} from '../post/schemas/PostReaction.schema';
import { TransformPost } from '../post/DTOs/output/TransformPost';
import { PostQueryRepository } from '../post/post.query.repository';
import { Comment, CommentSchema } from '../comment/schemas/Comment.schema';
import { TransformComment } from '../comment/DTOs/output/TransformComment';
import { CommentQueryRepository } from '../comment/comment.query.repository';
import { CommentReaction, CommentReactionSchema } from '../comment/schemas/CommentReaction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Blog.name,
        schema: BlogSchema,
      },
      {
        name: Comment.name,
        schema: CommentSchema,
      },
      {
        name: CommentReaction.name,
        schema: CommentReactionSchema,
      },
      {
        name: Post.name,
        schema: PostSchema,
      },
      {
        name: PostReaction.name,
        schema: PostReactionSchema,
      },
    ]),
  ],
  controllers: [BlogController],
  providers: [
    BlogService,
    BlogRepository,
    BlogQueryRepository,
    TransformPost,
    TransformComment,
    PostQueryRepository,
    CommentQueryRepository,
  ],
})
export class BlogModule {}
