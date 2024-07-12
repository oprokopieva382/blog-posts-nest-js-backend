import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BlogDocument = HydratedDocument<Blog>;

@Schema()
export class Blog {
  @Prop({ required: true})
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true})
  websiteUrl: string;

  @Prop({ required: false })
  isMembership?: string;

  @Prop({ default: new Date(), required: false })
  createdAt?: Date;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
