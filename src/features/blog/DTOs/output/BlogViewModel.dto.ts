import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { BlogDocument } from '../../schemas/Blog.schema';

export class BlogViewModel {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  websiteUrl: string;

  @IsNotEmpty()
  @IsBoolean()
  isMembership: boolean = false;

  @IsNotEmpty()
  @IsOptional()
  createdAt?: string;
}

export const transformToViewBlogs = (blog: BlogDocument): BlogViewModel => {
  return {
    id: blog._id.toString(),
    name: blog.name,
    description: blog.description,
    websiteUrl: blog.websiteUrl,
    isMembership: false,
    createdAt: blog.createdAt.toISOString(),
  };
};
