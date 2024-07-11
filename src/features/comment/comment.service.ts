import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';

@Injectable()
export class CommentService {
  constructor(protected commentRepository: CommentRepository) {}

  getByIdComment(id: string) {
    return this.commentRepository.getByIdComment(id);
  }
}
