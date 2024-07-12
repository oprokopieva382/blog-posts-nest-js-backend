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
import { PostInputModel } from './DTOs/input/PostInputModel.dto';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(protected postService: PostService) {}

  @Get()
  async getPosts() {
    return await this.postService.getPosts();
  }

  @Get(':id')
  async getByIdPost(@Param('id') id: string) {
    return await this.postService.getByIdPost(id);
  }

  @Get(':postId/comments')
  async getPostComments(@Param('postId') postId: string) {
    return await this.postService.getPostComments(postId);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createPost(@Body() dto: PostInputModel) {
    return await this.postService.createPost(dto);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updatePost(@Param('id') id: string, @Body() dto: PostInputModel) {
    return await this.postService.updatePost(id, dto);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string) {
    return await this.postService.deletePost(id);
  }
}
