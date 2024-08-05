import { Controller, Delete, HttpCode } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from '../blog/schemas/Blog.schema';
import { Post, PostDocument } from '../post/schemas/Post.schema';
import { User, UserDocument } from '../user/schemas/User.schema';
import { Comment, CommentDocument } from '../comment/schemas/Comment.schema';
import { CommentReaction, CommentReactionDocument } from '../comment/schemas/CommentReaction.schema';
import { PostReaction, PostReactionDocument } from '../post/schemas/PostReaction.schema';

@Controller('testing')
export class TestingController {
   constructor(
    @InjectModel(Blog.name) private BlogModel: Model<BlogDocument>,
    @InjectModel(Post.name) private PostModel: Model<PostDocument>,
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    @InjectModel(CommentReaction.name)
    private CommentReactionModel: Model<CommentReactionDocument>,
    @InjectModel(PostReaction.name)
    private PostReactionModel: Model<PostReactionDocument>,
    @InjectModel(Comment.name)
    private CommentModel: Model<CommentDocument>,
  ) {}

  @Delete('all-data')
  @HttpCode(204)
  async deleteData() {
    console.log('Delete data endpoint hit');
    await this.BlogModel.deleteMany({});
    await this.PostModel.deleteMany({});
    await this.UserModel.deleteMany({});
    await this.CommentModel.deleteMany({});
    await this.CommentReactionModel.deleteMany({});
    await this.PostReactionModel.deleteMany({});
    return;
  }
}
