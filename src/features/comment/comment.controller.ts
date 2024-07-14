import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentQueryRepository } from './comment.query.repository';

@Controller('comments')
export class CommentController {
  constructor(
    protected commentService: CommentService,
    protected commentQueryRepository: CommentQueryRepository,
  ) {}

  @Get(':id')
  async getByIdComment(@Param('id') id: string) {
    const result = await this.commentQueryRepository.getByIdComment(id);
    if (!result) {
      throw new NotFoundException();
    }
    return result.transformToView()
  }
}
