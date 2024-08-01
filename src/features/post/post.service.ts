import { Injectable, NotFoundException } from '@nestjs/common';
import { PostInputModel } from './DTOs/input/PostInputModel.dto';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(protected postRepository: PostRepository) {}

  async createPost(dto: PostInputModel) {
    const postDto = {
      ...dto,
      blog: dto.blogId,
      createdAt: new Date(),
    };
    return await this.postRepository.createPost(postDto);
  }

  async createPostComment(postId: string, content: string, user: any) {
    const post = await this.postRepository.getByIdPost(postId);
 
    if (!post) {
      throw new NotFoundException();
    }

    const newComment = {
      post: postId,
      content: content,
      commentatorInfo: {
        userId: user.id,
        userLogin: user.login,
      },
      likesCount: 0,
      dislikesCount: 0,
      myStatus: [],
      createdAt: new Date().toISOString(),
    };
    return await this.postRepository.createComment(newComment);
  }

  async updatePost(id: string, dto: PostInputModel) {
    return await this.postRepository.updatePost(id, dto);
  }

  async deletePost(id: string) {
    return await this.postRepository.deletePost(id);
  }
}
