import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user/schemas/User.schema';
import { UserInputModel } from '../user/DTOs/input/UserInputModel.dto';
import { transformToViewUsers } from '../user/DTOs/output/UserViewModel.dto';

@Injectable()
export class AuthRepository {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  async getByLoginOrEmail(login: string, email: string) {
    return await this.UserModel.findOne({
      $or: [{ email }, { login }],
    });
  }

  async registerUser(dto: UserInputModel) {
    const newUser = new this.UserModel(dto);
    const result = await newUser.save();
    return transformToViewUsers(result);
  }
}
