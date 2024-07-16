import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Blog } from 'src/features/blog/schemas/Blog.schema';
import { PostViewModel } from '../DTOs/output/PostViewModel.dto';
import { LikeStatus } from 'src/base/DTOs/enam/LikesStatus';

//  export interface PopulatedBlog extends Blog {
//    _id: mongoose.Types.ObjectId;
//  }

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

  @Prop({ required: true })
  reactionInfo: [];

  @Prop({ required: true, default: 0, min: 0 })
  likesCount: number;

  @Prop({ required: true, default: 0, min: 0 })
  dislikesCount: number;

  @Prop({ required: true })
  createdAt: Date;

//   transformToView(this: PostDocument): PostViewModel {
//     const blog = this.blog as PopulatedBlog;
// console.log(blog.name)
//     return {
//       id: this._id.toString(),
//       title: this.title,
//       shortDescription: this.shortDescription,
//       content: this.content,
//       blogId: blog._id.toString(),
//       blogName: blog.name,
//       createdAt: this.createdAt.toISOString(),
//       extendedLikesInfo: {
//         likesCount: 0,
//         dislikesCount: 0,
//         myStatus: LikeStatus.None,
//         newestLikes: [],
//       },
//     };
//   }
}

export const PostSchema = SchemaFactory.createForClass(Post);
PostSchema.loadClass(Post);

//!save for later
// @Prop({
//   type: mongoose.Schema.Types.ObjectId,
//   ref: 'PostReaction',
//   required: true,
// })
// reactionInfo: PostReaction;
