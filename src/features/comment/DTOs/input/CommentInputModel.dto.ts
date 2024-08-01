import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CommentInputModel {
  @IsNotEmpty()
  @IsString()
  @MaxLength(300)
  @MinLength(20)
  content: string;
}
