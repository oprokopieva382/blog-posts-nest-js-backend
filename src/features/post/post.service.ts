import { Injectable } from '@nestjs/common';
import { PostInputModel } from './DTOs/input/PostInputModel.dto';
import { PostRepository } from './post.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './schemas/Post.schema';
import { Model } from 'mongoose';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    protected postRepository: PostRepository,
  ) {}

  async getPosts() {
    return await this.postRepository.getPosts();
  }

  async getByIdPost(id: string) {
    return await this.postRepository.getByIdPost(id);
  }

  async getPostComments(postId: string) {
    return await this.postRepository.getPostComments(postId);
  }

  async createPost(dto: PostInputModel) {
    const newPost = new this.postModel(dto);
    return await this.postRepository.createPost(newPost);
  }

  async updatePost(id: string, dto: PostInputModel) {
    return await this.postRepository.updatePost(id, dto);
  }

  async deletePost(id: string) {
    return await this.postRepository.deletePost(id);
  }
}
