import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentQueryRepository } from './comment.query.repository';
import { TransformComment } from './DTOs/output/TransformComment';

@Controller('comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly commentQueryRepository: CommentQueryRepository,
    private readonly TransformComment: TransformComment,
  ) {}

  @Get(':id')
  async getByIdComment(@Param('id') id: string) {
    const result = await this.commentQueryRepository.getByIdComment(id);
    if (!result) {
      throw new NotFoundException();
    }
    return this.TransformComment.transformToViewModel(result);
  }
}
