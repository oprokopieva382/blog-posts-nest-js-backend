import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BlogInputModel } from './DTOs/input/BlogInputModel.dto';
import { BlogService } from './blog.service';
import { BlogPostInputModel } from './DTOs/input/BlogPostInputModel';
import { BlogQueryModel } from './DTOs/input/BlogQueryModel.dto';
import { BlogQueryRepository } from './blog.query.repository';
import { blogQueryFilter } from 'src/base/DTOs/utils/queryFilter';

@Controller('blogs')
export class BlogController {
  constructor(
    protected blogService: BlogService,
    protected blogQueryRepository: BlogQueryRepository,
  ) {}

  @Get()
  async getBlogs(@Query() query: BlogQueryModel) {
    return await this.blogQueryRepository.getBlogs(blogQueryFilter(query));
  }

  @Get(':id')
  async getByIdBlog(@Param('id') id: string) {
    return await this.blogQueryRepository.getByIdBlog(id);
  }

  @Get(':blogId/posts')
  async getBlogPosts(@Param('blogId') blogId: string) {
    return await this.blogService.getBlogPosts(blogId);
  }

  @Post(':blogId/posts')
  @UsePipes(new ValidationPipe())
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
