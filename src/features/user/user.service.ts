import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserInputModel } from './DTOs/input/UserInputModel';

@Injectable()
export class UserService {
  constructor(protected userRepository: UserRepository) {}

  getUsers() {
    return this.userRepository.getUsers();
  }

  createUser(data: UserInputModel) {
    return this.userRepository.createUser(data);
  }

  deleteUser(id: string) {
    return this.userRepository.deleteUser(id);
  }
}
