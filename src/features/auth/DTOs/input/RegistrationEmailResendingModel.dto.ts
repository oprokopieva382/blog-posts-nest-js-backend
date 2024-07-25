import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class RegistrationEmailResendingModel {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
  email: string;
}
