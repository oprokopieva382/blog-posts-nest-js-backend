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
import { PostInputModel } from './DTOs/input/PostInputModel.dto';
import { PostService } from './post.service';
import { PostQueryRepository } from './post.query.repository';
import { PostQueryModel } from './DTOs/input/PostQueryModel.dto';
import { baseQueryFilter } from 'src/base/DTOs/utils/queryFilter';

@Controller('posts')
export class PostController {
  constructor(
    protected postService: PostService,
    protected postQueryRepository: PostQueryRepository,
  ) {}

  @Get()
  async getPosts(@Query() query: PostQueryModel) {
    return await this.postQueryRepository.getPosts(baseQueryFilter(query));
  }

  @Get(':id')
  async getByIdPost(@Param('id') id: string) {
    return await this.postQueryRepository.getByIdPost(id);
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
