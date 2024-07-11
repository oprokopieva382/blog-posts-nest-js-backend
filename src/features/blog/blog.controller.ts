import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BlogInputModel } from './DTOs/input/BlogInputModel';
import { BlogService } from './blog.service';


@Controller('blogs')
export class BlogController {
  constructor(protected blogService: BlogService) {}

  @Get()
  getBlogs() {
    return this.blogService.getBlogs();
  }

  @Get(':id')
  getByIdBlog(@Param('id') id: string) {
    return this.blogService.getByIdBlog(id);
  }

  @Post()
  createBlog(@Body() data: BlogInputModel) {
    return this.blogService.createBlog(data);
  }

  @Put(':id')
  updateBlog(@Param('id') id: string, @Body() data: BlogInputModel) {
    return this.blogService.updateBlog(id, data);
  }

  @Delete(':id')
  deleteBlog(@Param('id') id: string) {
    return this.blogService.deleteBlog(id);
  }
}
