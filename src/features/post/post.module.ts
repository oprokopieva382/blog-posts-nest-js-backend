import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schemas/Post.schema';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';
import { PostQueryRepository } from './post.query.repository';
import {
  PostReaction,
  PostReactionSchema,
} from './schemas/PostReaction.schema';
import { Comment, CommentSchema } from '../comment/schemas/Comment.schema';
import { TransformComment } from '../comment/DTOs/output/TransformComment';
import { TransformPost } from './DTOs/output/TransformPost';
import { CommentQueryRepository } from '../comment/comment.query.repository';
import {
  CommentReaction,
  CommentReactionSchema,
} from '../comment/schemas/CommentReaction.schema';
import { CreatePostUseCase } from './use-cases/createPost-use-case';
import { UpdatePostUseCase } from './use-cases/updatePost-use-case';
import { DeletePostUseCase } from './use-cases/deletePost-use-case';
import { CreatePostCommentUseCase } from './use-cases/createPostComment-use-case';
//import { IsBlogIdExistConstraint } from 'src/base/utils/validateBlogId';
import { Blog, BlogSchema } from '../blog/schemas/Blog.schema';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: PostSchema,
      },
      // {
      //   name: Blog.name,
      //   schema: BlogSchema,
      // },
      {
        name: Comment.name,
        schema: CommentSchema,
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
  controllers: [PostController],
  providers: [
    //IsBlogIdExistConstraint,
    TransformPost,
    PostService,
    PostRepository,
    PostQueryRepository,
    TransformComment,
    CommentQueryRepository,
    CreatePostUseCase,
    UpdatePostUseCase,
    DeletePostUseCase,
    CreatePostCommentUseCase,
  ],
})
export class PostModule {}
