import { Controller, Get, Param } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comments')
export class CommentController {
  constructor(protected commentService: CommentService) {}

  @Get(':id')
  async getByIdComment(@Param('id') id: string) {
    return await this.commentService.getByIdComment(id);
  }
}
