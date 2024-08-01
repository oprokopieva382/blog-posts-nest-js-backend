import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './schemas/Comment.schema';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentRepository } from './comment.repository';
import { CommentQueryRepository } from './comment.query.repository';
import {
  CommentReaction,
  CommentReactionSchema,
} from './schemas/CommentReaction.schema';
import { Reaction, ReactionSchema } from 'src/base/schemas/Reaction.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Comment.name,
        schema: CommentSchema,
      },
      {
        name: CommentReaction.name,
        schema: CommentReactionSchema,
      },
      {
        name: Reaction.name,
        schema: ReactionSchema,
      },
    ]),
  ],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository, CommentQueryRepository],
})
export class CommentModule {}
