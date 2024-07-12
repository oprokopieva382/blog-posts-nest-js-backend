import { Injectable } from '@nestjs/common';
import { PostInputModel } from './DTOs/input/PostInputModel.dto';

@Injectable()
export class PostRepository {
  getPosts() {
    return 'Posts list';
  }

  getByIdPost(id: string) {
    return `Post with ${id}`;
  }

  getPostComments(postId: string) {
    return `Post with ${postId} has Super comments`;
  }

  createPost(data: PostInputModel) {
    return {
      title: data.title,
      shortDescription: data.shortDescription,
      content: data.content,
      blogId: data.blogId,
    };
  }

  updatePost(id: string, data: PostInputModel) {
    return {
      title: data.title,
      shortDescription: data.shortDescription,
      content: data.content,
      blogId: data.blogId,
    };
  }

  deletePost(id: string) {
    return `Post with ${id} removed`;
  }
}
