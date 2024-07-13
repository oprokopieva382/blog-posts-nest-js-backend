import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './schemas/User.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInputModel } from './DTOs/input/UserInputModel.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  async createUser(dto: UserInputModel) {
    const newUser = new this.UserModel(dto);
    const savedUser = await newUser.save();
    return savedUser.transformToView();
  }

  async deleteUser(id: string) {
    return await this.UserModel.findByIdAndDelete(id);
  }
}
