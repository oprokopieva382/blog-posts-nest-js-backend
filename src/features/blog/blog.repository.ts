import { Injectable } from '@nestjs/common';
import { BlogInputModel } from './DTOs/input/BlogInputModel';
import { BlogPostInputModel } from './DTOs/input/BlogPostInputModel';

@Injectable()
export class BlogRepository {
  getBlogs() {
    return 'Blogs list';
  }

  getByIdBlog(id: string) {
    return `Blog with ${id}`;
  }

  getBlogPosts(blogId: string) {
    return `Blog with ${blogId} has Super Posts`;
  }

  createBlogPost(blogId: string, data: BlogPostInputModel) {
    return `Blog with ${blogId} created Super Posts with data ${data}`;
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
