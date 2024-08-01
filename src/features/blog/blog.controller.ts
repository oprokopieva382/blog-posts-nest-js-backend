import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
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
import {
  BlogPostQueryModel,
  BlogQueryModel,
} from './DTOs/input/BlogQueryModel.dto';
import { BlogQueryRepository } from './blog.query.repository';
import { blogQueryFilter } from 'src/base/utils/queryFilter';
import { transformToViewBlogs } from './DTOs/output/BlogViewModel.dto';
import { TransformPost } from '../post/DTOs/output/TransformPost';

@Controller('blogs')
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    private readonly blogQueryRepository: BlogQueryRepository,
    private readonly TransformPost: TransformPost,
  ) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async getBlogs(@Query() query: BlogQueryModel) {
    return await this.blogQueryRepository.getBlogs(blogQueryFilter(query));
  }

  @Get(':id')
  async getByIdBlog(@Param('id') id: string) {
    const result = await this.blogQueryRepository.getByIdBlog(id);
    if (!result) {
      throw new NotFoundException();
    }
    return transformToViewBlogs(result);
  }

  @Get(':blogId/posts')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getBlogPosts(
    @Query() query: BlogPostQueryModel,
    @Param('blogId') blogId: string,
  ) {
    const result = await this.blogQueryRepository.getBlogPosts(
      blogId,
      blogQueryFilter(query),
    );
    if (result.items.length === 0) {
      throw new NotFoundException();
    }
    return result;
  }

  @Post(':blogId/posts')
  @UsePipes(new ValidationPipe())
  async createBlogPost(
    @Param('blogId') blogId: string,
    @Body() dto: BlogPostInputModel,
  ) {
    const result = await this.blogService.createBlogPost(blogId, dto);
    return this.TransformPost.transformToViewModel(result);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createBlog(@Body() dto: BlogInputModel) {
    const result = await this.blogService.createBlog(dto);
    return transformToViewBlogs(result);
  }

  @Put(':id')
  @HttpCode(204)
  @UsePipes(new ValidationPipe())
  async updateBlog(@Param('id') id: string, @Body() dto: BlogInputModel) {
    const result = await this.blogService.updateBlog(id, dto);
    if (!result) {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteBlog(@Param('id') id: string) {
    const result = await this.blogService.deleteBlog(id);
    if (!result) {
      throw new NotFoundException();
    }
  }
}
