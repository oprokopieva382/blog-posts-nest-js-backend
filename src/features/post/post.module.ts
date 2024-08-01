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


@Module({
  imports: [
    CqrsModule,
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
    TransformPost,
    PostService,
    PostRepository,
    PostQueryRepository,
    TransformComment,
    CommentQueryRepository,
    CreatePostUseCase,
  ],
})
export class PostModule {}
