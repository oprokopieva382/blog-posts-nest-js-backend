import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserInputModel } from './DTOs/input/UserInputModel.dto';

@Injectable()
export class UserService {
  constructor(protected userRepository: UserRepository) {}

  async createUser(dto: UserInputModel) {
    const userDto = {
      ...dto,
      createdAt: new Date(),
    };
    return await this.userRepository.createUser(userDto);
  }

  async deleteUser(id: string) {
    return await this.userRepository.deleteUser(id);
  }
}
