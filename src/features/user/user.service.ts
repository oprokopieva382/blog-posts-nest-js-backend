import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserInputModel } from './DTOs/input/UserInputModel.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/User.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    protected userRepository: UserRepository,
  ) {}

  async getUsers() {
    return await this.userRepository.getUsers();
  }

  async createUser(dto: UserInputModel) {
    const newUser = new this.userModel(dto);
    return await this.userRepository.createUser(newUser);
  }

  async deleteUser(id: string) {
    return await this.userRepository.deleteUser(id);
  }
}
