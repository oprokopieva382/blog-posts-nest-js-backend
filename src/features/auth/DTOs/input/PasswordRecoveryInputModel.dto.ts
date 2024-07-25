import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class PasswordRecoveryInputModel {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
  email: string;
}
