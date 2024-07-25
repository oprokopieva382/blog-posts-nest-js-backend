import { IsNotEmpty, IsString } from 'class-validator';

export class RegistrationConfirmationCodeModel {
  @IsNotEmpty()
  @IsString()
  code: string;
}
