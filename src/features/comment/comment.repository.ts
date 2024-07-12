import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentRepository {
  async getByIdComment(id: string) {
    return await `Comment with ${id}`;
  }
}
