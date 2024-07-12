import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentRepository {
  getByIdComment(id: string) {
    return `Comment with ${id}`;
  }
}
