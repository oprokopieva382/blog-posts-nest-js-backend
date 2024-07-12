import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  shortDescription: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true})
  blogId: string;

  @Prop({ required: true })
  blogName: string;

  @Prop({ default: new Date(), required: false })
  createdAt?: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
