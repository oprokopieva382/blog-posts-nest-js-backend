import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CommentRepository } from '../comment.repository';
import { CommentInputModel } from '../DTOs/input/CommentInputModel.dto';

export class UpdateCommentCommand {
  constructor(
    public commentId: string,
    public dto: CommentInputModel,
  ) {}
}

@CommandHandler(UpdateCommentCommand)
export class UpdateCommentUseCase
  implements ICommandHandler<UpdateCommentCommand>
{
  constructor(private readonly commentRepository: CommentRepository) {}

  async execute(command: UpdateCommentCommand) {
    return await this.commentRepository.updateComment(
      command.commentId,
      command.dto,
    );
  }
}
