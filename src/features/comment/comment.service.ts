import { Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';

@Injectable()
export class CommentService {
  constructor(protected commentRepository: CommentRepository) {}

  async getByIdComment(id: string) {
    return await this.commentRepository.getByIdComment(id);
  }
}
