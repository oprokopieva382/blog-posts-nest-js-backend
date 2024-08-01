import { InjectModel } from "@nestjs/mongoose";
import { Comment, CommentDocument } from './schemas/Comment.schema';
import { Model } from "mongoose";

export class CommentQueryRepository {
  constructor(
    @InjectModel(Comment.name) private CommentModel: Model<CommentDocument>,
  ) {}

  async getByIdComment(id: string) {
    return await this.CommentModel.findById(id).populate('post');
  }

  async getReactionStatus(userId: string, commentId: string) {
    return;
  }
}