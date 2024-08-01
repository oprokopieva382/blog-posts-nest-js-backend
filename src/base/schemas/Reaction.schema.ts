import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';
import { User } from 'src/features/user/schemas/User.schema';

export type ReactionDocument = Reaction & Document;

@Schema({ discriminatorKey: 'category' })
export class Reaction {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  })
  user: User;

  @Prop({ required: true })
  createdAt: Date;
}

export const ReactionSchema = SchemaFactory.createForClass(Reaction);

export const ReactionModel = mongoose.model<ReactionDocument>(
  'Reaction',
  ReactionSchema,
);
