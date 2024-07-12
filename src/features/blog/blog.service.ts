import { Injectable } from '@nestjs/common';
import { BlogInputModel } from './DTOs/input/BlogInputModel.dto';
import { BlogRepository } from './blog.repository';
import { BlogPostInputModel } from './DTOs/input/BlogPostInputModel';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from './schemas/Blog.schema';
import { Model } from 'mongoose';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
    protected blogRepository: BlogRepository,
  ) {}

  async getBlogs() {
    return await this.blogRepository.getBlogs();
  }

  async getByIdBlog(id: string) {
    return await this.blogRepository.getByIdBlog(id);
  }

  async getBlogPosts(blogId: string) {
    return await this.blogRepository.getBlogPosts(blogId);
  }

  async createBlogPost(blogId: string, dto: BlogPostInputModel) {
    return await this.blogRepository.createBlogPost(blogId, dto);
  }

  async createBlog(dto: BlogInputModel) {
    const newBlog = new this.blogModel(dto);
    return await this.blogRepository.createBlog(newBlog);
  }

  async updateBlog(id: string, dto: BlogInputModel) {
    return await this.blogRepository.updateBlog(id, dto);
  }

  async deleteBlog(id: string) {
    return await this.blogRepository.deleteBlog(id);
  }
}
