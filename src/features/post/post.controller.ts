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
  UseGuards,
  Request,
} from '@nestjs/common';
import { PostInputModel } from './DTOs/input/PostInputModel.dto';
import { PostService } from './post.service';
import { PostQueryRepository } from './post.query.repository';
import { PostQueryModel } from './DTOs/input/PostQueryModel.dto';
import { baseQueryFilter } from 'src/base/utils/queryFilter';
import { transformToViewPosts } from './DTOs/output/PostViewModel.dto';
import { CommentInputModel } from '../comment/DTOs/input/CommentInputModel.dto';
import { TransformComment } from '../comment/DTOs/output/TransformComment';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminAuthGuard } from '../auth/guards/admin-auth.guard';
import { LikeInputModel } from 'src/base/DTOs/input/LikeInputModel.dto';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard';

@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly postQueryRepository: PostQueryRepository,
    private readonly TransformComment: TransformComment,
  ) {}

  @Get()
  @UseGuards(OptionalJwtAuthGuard)
  @HttpCode(201)
  async getPosts(@Query() query: PostQueryModel, @Request() req) {
    return await this.postQueryRepository.getPosts(
      baseQueryFilter(query),
      req?.user?.id,
    );
  }

  @Get(':id')
  async getByIdPost(@Param('id') id: string) {
    const result = await this.postQueryRepository.getByIdPost(id);
    if (!result) {
      throw new NotFoundException();
    }
    return transformToViewPosts(result);
  }

  @Get(':postId/comments')
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

  @Post(':postId/comments')
  @UseGuards(JwtAuthGuard)
  async createPostComment(
    @Body() dto: CommentInputModel,
    @Param('postId') postId: string,
    @Request() req,
  ) {
    const result = await this.postService.createPostComment(
      postId,
      dto.content,
      req.user,
    );

    if (!result) {
      throw new NotFoundException();
    }

    return this.TransformComment.transformToViewModel(result);
  }

  @Post()
  @UseGuards(AdminAuthGuard)
  async createPost(@Body() dto: PostInputModel) {
    const result = await this.postService.createPost(dto);
    return transformToViewPosts(result);
  }

  @Put(':id')
  @HttpCode(204)
  @UseGuards(AdminAuthGuard)
  async updatePost(@Param('id') id: string, @Body() dto: PostInputModel) {
    const result = await this.postService.updatePost(id, dto);
    if (!result) {
      throw new NotFoundException();
    }
  }

  @Put(':postId/like-status')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  async reactToPost(
    @Param('postId') postId: string,
    @Body() dto: LikeInputModel,
    @Request() req,
  ) {
    const result = await this.postService.reactToPost(
      postId,
      dto.likeStatus,
      req.user,
    );
    if (!result) {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  @UseGuards(AdminAuthGuard)
  @HttpCode(204)
  async deletePost(@Param('id') id: string) {
    const result = await this.postService.deletePost(id);
    if (!result) {
      throw new NotFoundException();
    }
  }
}
