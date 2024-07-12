import { Controller, Get, Param } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comments')
export class CommentController {
  constructor(protected commentService: CommentService) {}

  @Get(':id')
  getByIdComment(@Param('id') id: string) {
    return this.commentService.getByIdComment(id);
  }
}
