import { Injectable } from '@nestjs/common';
import { BlogInputModel } from './DTOs/input/BlogInputModel';
import { BlogRepository } from './blog.repository';

@Injectable()
export class BlogService {
  constructor(protected blogRepository: BlogRepository) {}

  getBlogs() {
    return this.blogRepository.getBlogs();
  }

  getByIdBlog(id: string) {
    return this.blogRepository.getByIdBlog(id);
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
