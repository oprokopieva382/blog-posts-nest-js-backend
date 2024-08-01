import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from './schemas/Comment.schema';
import { Model } from 'mongoose';
import {
  CommentReaction,
  CommentReactionDocument,
} from './schemas/CommentReaction.schema';

export class CommentQueryRepository {
  constructor(
    @InjectModel(Comment.name) private CommentModel: Model<CommentDocument>,
    @InjectModel(CommentReaction.name)
    private CommentReactionModel: Model<CommentReactionDocument>,
  ) {}

  async getByIdComment(id: string) {
    return await this.CommentModel.findById(id).populate('post');
  }

  async getReactionStatus(userId: string, commentId: string) {
    return this.CommentReactionModel.findOne({
      user: userId,
      comment: commentId,
    });
  }
}
