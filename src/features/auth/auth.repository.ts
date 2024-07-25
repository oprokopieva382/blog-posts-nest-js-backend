import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../user/schemas/User.schema';
import { UserInputModel } from '../user/DTOs/input/UserInputModel.dto';
import { transformToViewUsers } from '../user/DTOs/output/UserViewModel.dto';

@Injectable()
export class AuthRepository {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  async getByLoginOrEmail(data: string) {
    return await this.UserModel.findOne({
      $or: [{ email: data }, { login: data }],
    });
  }

  async getByConfirmationCode(code: string) {
    return await this.UserModel.findOne({
      'emailConfirmation.confirmationCode': code,
    });
  }

  async updateConfirmation(_id: Types.ObjectId) {
    return await this.UserModel.findByIdAndUpdate(
      { _id },
      { $set: { 'emailConfirmation.isConfirmed': true } },
      { new: true },
    );
  }

  async updateCode(_id: Types.ObjectId, newCode: string) {
    await this.UserModel.findByIdAndUpdate(
      { _id },
      {
        $set: {
          'emailConfirmation.confirmationCode': newCode,
        },
      },
    );
  }

  async registerUser(dto: UserInputModel) {
    const newUser = new this.UserModel(dto);
    const result = await newUser.save();
    return transformToViewUsers(result);
  }
}
