import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './schemas/User.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUsers() {
    return await this.userModel.find();
  }

  async createUser(newUser: UserDocument) {
    return newUser.save();
  }

  async deleteUser(id: string) {
    return await this.userModel.findOneAndDelete({ _id: id });
  }
}
