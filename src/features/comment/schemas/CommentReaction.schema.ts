import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { LikeStatus } from 'src/base/enam/LikesStatus';
import { Reaction, ReactionModel } from 'src/base/schemas/Reaction.schema';

export type CommentReactionDocument = HydratedDocument<CommentReaction>;

@Schema()
export class CommentReaction extends Reaction {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    required: true,
  })
  comment: Comment;

  @Prop({
    type: String,
    enum: Object.values(LikeStatus),
    default: LikeStatus.None,
    required: true,
  })
  status: string;
}

export const CommentReactionSchema =
  SchemaFactory.createForClass(CommentReaction);

export const CommentReactionModel =
  ReactionModel.discriminator<CommentReactionDocument>(
    'CommentReaction',
    CommentReactionSchema,
  );
