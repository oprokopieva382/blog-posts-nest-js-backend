import { Injectable } from '@nestjs/common';
import { BlogInputModel } from './DTOs/input/BlogInputModel';

@Injectable()
export class BlogRepository {
  getBlogs() {
    return 'Blogs list';
  }

  getByIdBlog(id: string) {
    return `Blog with ${id}`;
  }

  createBlog(data: BlogInputModel) {
    return {
      name: data.name,
      description: data.description,
      websiteUrl: data.websiteUrl,
    };
  }

  updateBlog(id: string, data: BlogInputModel) {
    return {
      name: data.name,
      description: data.description,
      websiteUrl: data.websiteUrl,
    };
  }

  deleteBlog(id: string) {
    return `Blog with ${id} removed`;
  }
}
