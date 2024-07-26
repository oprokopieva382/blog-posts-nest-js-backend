import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from '../user/schemas/User.schema';
import { UserInputModel } from '../user/DTOs/input/UserInputModel.dto';
import { transformToViewUsers } from '../user/DTOs/output/UserViewModel.dto';
import {
  PasswordRecoveryCode,
  PasswordRecoveryCodeDocument,
} from './schemas/PasswordRecoveryCode.schema';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
    @InjectModel(PasswordRecoveryCode.name)
    private readonly PasswordRecoveryCodeModel: Model<PasswordRecoveryCodeDocument>,
  ) {}

  async getByLoginOrEmail(login: string, email: string) {
    return await this.UserModel.findOne({
      $or: [{ email }, { login }],
    });
  }

  async getByLogin(login: string) {
    return await this.UserModel.findOne({ login });
  }

  async getByEmail(email: string) {
    return await this.UserModel.findOne({ email });
  }

  async getByConfirmationCode(code: string) {
    return await this.UserModel.findOne({
      'emailConfirmation.confirmationCode': code,
    });
  }

  async getByRecoveryCode(recoveryCode: string) {
    return await this.PasswordRecoveryCodeModel.findOne({ recoveryCode });
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

  async savePasswordRecoveryInfo(passwordRecovery: PasswordRecoveryCode) {
    return await this.PasswordRecoveryCodeModel.create({
      ...passwordRecovery,
    });
  }

  async setNewPassword(email: string, newPassword: string) {
    return await this.UserModel.findOneAndUpdate(
      { email },
      { $set: { password: newPassword } },
      { new: true },
    );
  }
}
