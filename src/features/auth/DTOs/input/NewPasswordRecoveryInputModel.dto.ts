import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class NewPasswordRecoveryInputModel {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  newPassword: string;

  @IsNotEmpty()
  @IsString()
  recoveryCode: string;
}
