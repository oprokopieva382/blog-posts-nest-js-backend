import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BlogViewModel } from '../DTOs/output/BlogViewModel.dto';

export type BlogDocument = HydratedDocument<Blog>;

@Schema()
export class Blog {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  websiteUrl: string;

  @Prop({ default: false, required: true })
  isMembership: string;

  @Prop({ default: new Date(), required: false })
  createdAt?: Date;

  transformToView(this: BlogDocument): BlogViewModel {
    return {
      id: this._id.toString(),
      name: this.name,
      description: this.description,
      websiteUrl: this.websiteUrl,
      isMembership: false,
      createdAt: this.createdAt.toISOString(),
    };
  }
}

export const BlogSchema = SchemaFactory.createForClass(Blog);

BlogSchema.methods = {
  transformToView: Blog.prototype.transformToView,
};
