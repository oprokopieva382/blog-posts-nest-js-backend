import { Injectable } from '@nestjs/common';
import { BlogInputModel } from './DTOs/input/BlogInputModel';
import { BlogRepository } from './blog.repository';
import { BlogPostInputModel } from './DTOs/input/BlogPostInputModel';

@Injectable()
export class BlogService {
  constructor(protected blogRepository: BlogRepository) {}

  getBlogs() {
    return this.blogRepository.getBlogs();
  }

  getByIdBlog(id: string) {
    return this.blogRepository.getByIdBlog(id);
  }

  getBlogPosts(blogId: string) {
    return this.blogRepository.getBlogPosts(blogId);
  }

  createBlogPost(blogId: string, data: BlogPostInputModel) {
    return this.blogRepository.createBlogPost(blogId, data);
  }

  createBlog(data: BlogInputModel) {
    return this.blogRepository.createBlog(data);
  }

  updateBlog(id: string, data: BlogInputModel) {
    return this.blogRepository.updateBlog(id, data);
  }

  deleteBlog(id: string) {
    return this.blogRepository.deleteBlog(id);
  }
}
