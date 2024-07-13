import { Injectable } from '@nestjs/common';
import { PostInputModel } from './DTOs/input/PostInputModel.dto';
import { PostRepository } from './post.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './schemas/Post.schema';
import { Model } from 'mongoose';

@Injectable()
export class PostService {
  constructor(protected postRepository: PostRepository) {}

  async getPostComments(postId: string) {
    return await this.postRepository.getPostComments(postId);
  }

  async createPost(dto: PostInputModel) {
    return await this.postRepository.createPost(dto);
  }

  async updatePost(id: string, dto: PostInputModel) {
    return await this.postRepository.updatePost(id, dto);
  }

  async deletePost(id: string) {
    return await this.postRepository.deletePost(id);
  }
}
