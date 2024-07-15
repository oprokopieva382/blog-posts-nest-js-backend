import { OmitType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsInt,  IsOptional, IsString } from 'class-validator';

export class BlogQueryModel {
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  sortBy?: string;

  @IsString()
  @IsOptional()
  sortDirection?: 1 | -1;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  pageNumber?: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  pageSize?: number;

  @IsString()
  @IsOptional()
  searchNameTerm?: string | null = null;
}

export class BlogPostQueryModel extends OmitType(BlogQueryModel, [
  'searchNameTerm',
] as const) {}
