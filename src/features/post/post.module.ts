import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    MongooseModule.forFeature([
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
  controllers: [PostController],
  providers: [PostService, PostRepository, PostQueryRepository],
})
export class PostModule {}
