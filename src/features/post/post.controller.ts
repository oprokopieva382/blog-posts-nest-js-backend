import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostInputModel } from './DTOs/input/PostInputModel.dto';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(protected postService: PostService) {}

  @Get()
  getPosts() {
    return this.postService.getPosts();
  }

  @Get(':id')
  getByIdPost(@Param('id') id: string) {
    return this.postService.getByIdPost(id);
  }

  @Get(':postId/comments')
  getPostComments(@Param('postId') postId: string) {
    return this.postService.getPostComments(postId);
  }

  @Post()
  createPost(@Body() data: PostInputModel) {
    return this.postService.createPost(data);
  }

  @Put(':id')
  updatePost(@Param('id') id: string, @Body() data: PostInputModel) {
    return this.postService.updatePost(id, data);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postService.deletePost(id);
  }
}
