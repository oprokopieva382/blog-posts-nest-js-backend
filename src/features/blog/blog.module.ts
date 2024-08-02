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
import { CreateBlogPostUseCase } from './use-cases/createBlogPost-use-case';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateBlogUseCase } from './use-cases/createBlog-use-case';
import { UpdateBlogUseCase } from './use-cases/updateBlog-use-case';
import { DeleteBlogUseCase } from './use-cases/deleteBlog-use-case';
import { TransformBlog } from './DTOs/output/TransformBlog';

@Module({
  imports: [
    CqrsModule,
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
    TransformBlog,
    PostQueryRepository,
    CommentQueryRepository,
    CreateBlogPostUseCase,
    CreateBlogUseCase,
    UpdateBlogUseCase,
    DeleteBlogUseCase,
  ],
})
export class BlogModule {}
