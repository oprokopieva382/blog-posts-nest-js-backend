import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './schemas/Comment.schema';
import { CommentInputModel } from './DTOs/input/CommentInputModel.dto';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectModel(Comment.name) private CommentModel: Model<CommentDocument>,
  ) {}

  async updateComment(commentId: string, dto: CommentInputModel) {
    return await this.CommentModel.findByIdAndUpdate(commentId, dto, {
      new: true,
    });
  }
}
