import { Injectable } from '@nestjs/common';
import { UserInputModel } from './DTOs/input/UserInputModel';

@Injectable()
export class UserRepository {
  getUsers() {
    return 'users list';
  }

  createUser(data: UserInputModel) {
    return {
      login: data.login,
      password: data.password,
      email: data.email,
    };
  }

  deleteUser(id: string) {
    return `user with ${id} removed`;
  }
}
