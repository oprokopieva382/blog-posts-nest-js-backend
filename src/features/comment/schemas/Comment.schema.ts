import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { LikeStatus } from 'src/base/DTOs/enam/LikesStatus';
import { Post } from 'src/features/post/schemas/Post.schema';
import { CommentViewModel } from '../DTOs/output/CommentViewModel';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop({ required: true })
  content: string;

  @Prop({ type: mongoose.Schema.Types.Mixed, required: true })
  commentatorInfo: {
    userId: string;
    userLogin: string;
  };

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true })
  post: Post;

  @Prop({ required: true })
  myStatus: LikeStatus.None;

  @Prop({ required: true, default: 0, min: 0 })
  likesCount: number;

  @Prop({ required: true, default: 0, min: 0 })
  dislikesCount: number;

  @Prop({ default: new Date(), required: false })
  createdAt?: Date;

  transformToView(this: CommentDocument): CommentViewModel {
    return {
      id: this._id.toString(),
      content: this.content,
      commentatorInfo: {
        userId: '6690b370d2910320064dd187',
        userLogin: 'oksanaYo',
      },
      likesInfo: {
        likesCount: 0,
        dislikesCount: 0,
        myStatus: LikeStatus.None,
      },
      createdAt: this.createdAt.toISOString(),
    };
  }
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

CommentSchema.methods = {
  transformToView: Comment.prototype.transformToView,
};
