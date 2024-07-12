import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BlogInputModel } from './DTOs/input/BlogInputModel.dto';
import { BlogService } from './blog.service';
import { BlogPostInputModel } from './DTOs/input/BlogPostInputModel';

@Controller('blogs')
export class BlogController {
  constructor(protected blogService: BlogService) {}

  @Get()
  async getBlogs() {
    return await this.blogService.getBlogs();
  }

  @Get(':id')
  async getByIdBlog(@Param('id') id: string) {
    return await this.blogService.getByIdBlog(id);
  }

  @Get(':blogId/posts')
  async getBlogPosts(@Param('blogId') blogId: string) {
    return await this.blogService.getBlogPosts(blogId);
  }

  @Post(':blogId/posts')
  async createBlogPost(
    @Param('blogId') blogId: string,
    @Body() dto: BlogPostInputModel,
  ) {
    return await this.blogService.createBlogPost(blogId, dto);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createBlog(@Body() dto: BlogInputModel) {
    return await this.blogService.createBlog(dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateBlog(@Param('id') id: string, @Body() dto: BlogInputModel) {
    return await this.blogService.updateBlog(id, dto);
  }

  @Delete(':id')
  async deleteBlog(@Param('id') id: string) {
    return await this.blogService.deleteBlog(id);
  }
}
