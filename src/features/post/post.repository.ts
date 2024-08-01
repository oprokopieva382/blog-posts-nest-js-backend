import { Injectable } from '@nestjs/common';
import { PostInputModel } from './DTOs/input/PostInputModel.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './schemas/Post.schema';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from '../comment/schemas/Comment.schema';

@Injectable()
export class PostRepository {
  constructor(
    @InjectModel(Post.name) private PostModel: Model<PostDocument>,
    @InjectModel(Comment.name) private CommentModel: Model<CommentDocument>,
  ) {}

  async getByIdPost(id: string) {
    return await this.PostModel.findById(id).populate('blog');
  }

  async createPost(dto: PostInputModel) {
    const newPost = new this.PostModel(dto);
    return (await newPost.save()).populate('blog');
  }

  async createComment(comment: any) {
    const newComment = new this.CommentModel(comment);
    return (await newComment.save()).populate('post');
  }

  async updatePost(id: string, dto: PostInputModel) {
    return await this.PostModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async deletePost(id: string) {
    return await this.PostModel.findByIdAndDelete(id);
  }
}
