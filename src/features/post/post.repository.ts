import { Injectable } from '@nestjs/common';
import { PostInputModel } from './DTOs/input/PostInputModel.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './schemas/Post.schema';
import { Model } from 'mongoose';

@Injectable()
export class PostRepository {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async createPost(dto: PostInputModel) {
    const newPost = new this.postModel(dto);
    return (await newPost.save()).populate('blog');
  }

  async updatePost(id: string, dto: PostInputModel) {
    return await this.postModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async deletePost(id: string) {
    return await this.postModel.findByIdAndDelete(id);
  }
}
