import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogInputModel } from './DTOs/input/BlogInputModel.dto';
import { BlogRepository } from './blog.repository';
import { BlogPostInputModel } from './DTOs/input/BlogPostInputModel';

@Injectable()
export class BlogService {
  constructor(protected blogRepository: BlogRepository) {}

  async createBlogPost(blogId: string, dto: BlogPostInputModel) {
    const blog = await this.blogRepository.getByIdBlog(blogId);
    if (!blog) {
      throw new NotFoundException();
    }
    const postDto = {
      ...dto,
      blog: blogId,
      likesCount: 0,
      dislikesCount: 0,
      reactionInfo: [],
      createdAt: new Date(),
    };

    return await this.blogRepository.createBlogPost(postDto);
  }

  async createBlog(dto: BlogInputModel) {
    const blogDto = {
      ...dto,
      createdAt: new Date(),
    };
    return await this.blogRepository.createBlog(blogDto);
  }

  async updateBlog(id: string, dto: BlogInputModel) {
    return await this.blogRepository.updateBlog(id, dto);
  }

  async deleteBlog(id: string) {
    return await this.blogRepository.deleteBlog(id);
  }
}
