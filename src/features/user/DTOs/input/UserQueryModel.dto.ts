import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UserQueryModel {
  @IsString()
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
  searchLoginTerm?: string | null = null;

  @IsString()
  @IsOptional()
  searchEmailTerm?: string | null = null;
}
