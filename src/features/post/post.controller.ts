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
import { PostInputModel } from './DTOs/input/PostInputModel.dto';
import { PostService } from './post.service';
import { PostQueryRepository } from './post.query.repository';
import { PostQueryModel } from './DTOs/input/PostQueryModel.dto';
import { baseQueryFilter } from 'src/base/DTOs/utils/queryFilter';
import { transformToView } from './DTOs/output/PostViewModel.dto';

@Controller('posts')
export class PostController {
  constructor(
    protected postService: PostService,
    protected postQueryRepository: PostQueryRepository,
  ) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async getPosts(@Query() query: PostQueryModel) {
    return await this.postQueryRepository.getPosts(baseQueryFilter(query));
  }

  @Get(':id')
  async getByIdPost(@Param('id') id: string) {
    const result = await this.postQueryRepository.getByIdPost(id);
    if (!result) {
      throw new NotFoundException();
    }
    return transformToView(result);
  }

  @Get(':postId/comments')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getPostComments(
    @Query() query: PostQueryModel,
    @Param('postId') postId: string,
  ) {
    const result = await this.postQueryRepository.getPostComments(
      postId,
      baseQueryFilter(query),
    );
    if (result.items.length === 0 || !result) {
      throw new NotFoundException();
    }
    return result;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createPost(@Body() dto: PostInputModel) {
    const result = await this.postService.createPost(dto);
    return transformToView(result);
  }

  @Put(':id')
  @HttpCode(204)
  @UsePipes(new ValidationPipe())
  async updatePost(@Param('id') id: string, @Body() dto: PostInputModel) {
    const result = await this.postService.updatePost(id, dto);
    if (!result) {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async deletePost(@Param('id') id: string) {
    const result = await this.postService.deletePost(id);
    if (!result) {
      throw new NotFoundException();
    }
  }
}
