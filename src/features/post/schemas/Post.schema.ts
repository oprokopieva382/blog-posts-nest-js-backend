import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Blog } from 'src/features/blog/schemas/Blog.schema';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  shortDescription: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true })
  blog: Blog;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true })
  reactionInfo: Blog;

  @Prop({ required: true, default: 0, min: 0 })
  likesCount: number;

  @Prop({ required: true, default: 0, min: 0 })
  dislikesCount: number;

  @Prop({ default: new Date(), required: false })
  createdAt?: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
