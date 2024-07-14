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
