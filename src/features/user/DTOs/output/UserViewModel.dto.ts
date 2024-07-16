import { IsNotEmpty, IsString } from 'class-validator';
import { UserDocument } from '../../schemas/User.schema';

export class UserViewModel {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  createdAt: string;
}

export const transformToViewUsers = (user: UserDocument): UserViewModel => {
  return {
    id: user._id.toString(),
    login: user.login,
    email: user.email,
    createdAt: user.createdAt.toISOString(),
  };
};
