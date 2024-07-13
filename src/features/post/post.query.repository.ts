import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './schemas/Post.schema';
import { Model } from 'mongoose';

@Injectable()
export class PostQueryRepository {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async getPosts() {
    return await this.postModel.find();
  }

  async getByIdPost(id: string) {
    return await this.postModel.findById(id);
  }
}
