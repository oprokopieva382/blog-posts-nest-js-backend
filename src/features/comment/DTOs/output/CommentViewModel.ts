import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { LikesInfoViewModel } from 'src/base/DTOs/output/LikesInfoViewModel.dto';
import { CommentDocument } from '../../schemas/Comment.schema';
import { LikeStatus } from 'src/base/enam/LikesStatus';

class CommentatorInfo {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  userLogin: string;
}
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

export const transformToViewComments = (
  comment: CommentDocument,
): CommentViewModel => {
  return {
    id: comment._id.toString(),
    content: comment.content,
    commentatorInfo: {
      userId: '6690b370d2910320064dd187',
      userLogin: 'oksanaYo',
    },
    likesInfo: {
      likesCount: 0,
      dislikesCount: 0,
      myStatus: LikeStatus.None,
    },
    createdAt: comment.createdAt.toISOString(),
  };
};
