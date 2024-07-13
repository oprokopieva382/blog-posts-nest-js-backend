import { Injectable } from '@nestjs/common';
import { BlogInputModel } from './DTOs/input/BlogInputModel.dto';
import { BlogRepository } from './blog.repository';
import { BlogPostInputModel } from './DTOs/input/BlogPostInputModel';

@Injectable()
export class BlogService {
  constructor(protected blogRepository: BlogRepository) {}

  async getBlogPosts(blogId: string) {
    return await this.blogRepository.getBlogPosts(blogId);
  }

  async createBlogPost(blogId: string, dto: BlogPostInputModel) {
    return await this.blogRepository.createBlogPost(blogId, dto);
  }

  async createBlog(dto: BlogInputModel) {
    return await this.blogRepository.createBlog(dto);
  }

  async updateBlog(id: string, dto: BlogInputModel) {
    return await this.blogRepository.updateBlog(id, dto);
  }

  async deleteBlog(id: string) {
    return await this.blogRepository.deleteBlog(id);
  }
}
