import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import mongoose from 'mongoose';
import { ExtendedLikesInfoViewModel } from 'src/base/DTOs/output/ExtendedLikesInfoViewModel.dto';
import { Blog } from 'src/features/blog/schemas/Blog.schema';
import { PostDocument } from '../../schemas/Post.schema';
import { LikeStatus } from 'src/base/enum/LikesStatus';

export class PostViewModel {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  shortDescription: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  blogId: string;

  @IsNotEmpty()
  @IsString()
  blogName: string;

  @IsNotEmpty()
  @IsString()
  extendedLikesInfo: ExtendedLikesInfoViewModel;

  @IsNotEmpty()
  @IsOptional()
  createdAt?: string;
}

export interface PopulatedBlog extends Blog {
  _id: mongoose.Types.ObjectId;
}

export const transformToViewPosts = (
  post: PostDocument,
  userId?: string,
): PostViewModel => {
  const blog = post.blog as PopulatedBlog;

  return {
    id: post._id.toString(),
    title: post.title,
    shortDescription: post.shortDescription,
    content: post.content,
    blogId: blog._id.toString(),
    blogName: blog.name,
    createdAt: post.createdAt.toISOString(),
    extendedLikesInfo: {
      likesCount: 0,
      dislikesCount: 0,
      myStatus: LikeStatus.None,
      newestLikes: [],
    },
  };
};
