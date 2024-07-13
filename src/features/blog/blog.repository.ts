import { Injectable } from '@nestjs/common';
import { BlogInputModel } from './DTOs/input/BlogInputModel.dto';
import { BlogPostInputModel } from './DTOs/input/BlogPostInputModel';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from './schemas/Blog.schema';
import { Model } from 'mongoose';

@Injectable()
export class BlogRepository {
  constructor(@InjectModel(Blog.name) private BlogModel: Model<BlogDocument>) {}

  async getBlogPosts(blogId: string) {
    return await `Blog with ${blogId} has Super Posts`;
  }

  async createBlogPost(blogId: string, data: BlogPostInputModel) {
    return await `Blog with ${blogId} created Super Posts with data ${data}`;
  }

  async createBlog(dto: BlogInputModel) {
    const newBlog = new this.BlogModel(dto);
    return await newBlog.save();
  }

  async updateBlog(id: string, dto: BlogInputModel) {
    return await this.BlogModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async deleteBlog(id: string) {
    return await this.BlogModel.findByIdAndDelete(id);
  }
}
