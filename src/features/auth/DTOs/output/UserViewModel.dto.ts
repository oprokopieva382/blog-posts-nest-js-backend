import { IsNotEmpty, IsString } from 'class-validator';
import { UserDocument } from 'src/features/user/schemas/User.schema';

export class UserViewModel {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsString()
  email: string;
}

export const transformToViewUser = (user: UserDocument): UserViewModel => {
  return {
    email: user.email,
    login: user.login,
    userId: user._id.toString(),
  };
};
