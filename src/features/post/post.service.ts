import { Injectable } from '@nestjs/common';
import { PostInputModel } from './DTOs/input/PostInputModel.dto';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(protected postRepository: PostRepository) {}

  async createPost(dto: PostInputModel) {
     const postDto = {
       ...dto,
       createdAt: new Date(),
     };
    return await this.postRepository.createPost(postDto);
  }

  async updatePost(id: string, dto: PostInputModel) {
    return await this.postRepository.updatePost(id, dto);
  }

  async deletePost(id: string) {
    return await this.postRepository.deletePost(id);
  }
}
