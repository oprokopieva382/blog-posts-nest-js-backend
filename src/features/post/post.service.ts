import { Injectable } from '@nestjs/common';
import { PostInputModel } from './DTOs/input/PostInputModel';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(protected postRepository: PostRepository) {}

  getPosts() {
    return this.postRepository.getPosts();
  }

  getByIdPost(id: string) {
    return this.postRepository.getByIdPost(id);
  }

  getPostComments(postId: string) {
    return this.postRepository.getPostComments(postId);
  }

  createPost(data: PostInputModel) {
    return this.postRepository.createPost(data);
  }

  updatePost(id: string, data: PostInputModel) {
    return this.postRepository.updatePost(id, data);
  }

  deletePost(id: string) {
    return this.postRepository.deletePost(id);
  }
}
