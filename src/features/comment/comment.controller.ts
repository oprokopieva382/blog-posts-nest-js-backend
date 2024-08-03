import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentQueryRepository } from './comment.query.repository';
import { TransformComment } from './DTOs/output/TransformComment';
import { CommentInputModel } from './DTOs/input/CommentInputModel.dto';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateCommentCommand } from './use-cases/updateComment-use-case';

@Controller('comments')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly commentQueryRepository: CommentQueryRepository,
    private readonly TransformComment: TransformComment,
    private readonly commandBus: CommandBus,
  ) {}

  @Get(':id')
  async getByIdComment(@Param('id') id: string) {
    const result = await this.commentQueryRepository.getByIdComment(id);
    if (!result) {
      throw new NotFoundException();
    }
    return this.TransformComment.transformToViewModel(result);
  }

  @Put(':commentId')
  async updateComment(
    @Param('commentId') commentId: string,
    @Body() dto: CommentInputModel,
  ) {
    const result = await this.commandBus.execute(
      new UpdateCommentCommand(commentId, dto),
    );
    if (!result) {
      throw new NotFoundException();
    }
    return this.TransformComment.transformToViewModel(result);
  }
}
