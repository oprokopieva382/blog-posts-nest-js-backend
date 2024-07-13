import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class BlogPostInputModel {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  shortDescription: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  content: string;
}
