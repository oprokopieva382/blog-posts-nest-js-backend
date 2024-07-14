import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { LikesInfoViewModel } from "src/base/DTOs/output/LikesInfoViewModel.dto";

export class CommentViewModel {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  commentatorInfo: CommentatorInfo;

  @IsNotEmpty()
  likesInfo: LikesInfoViewModel;

  @IsNotEmpty()
  @IsOptional()
  createdAt?: string;
}

class CommentatorInfo {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  userLogin: string;
}

