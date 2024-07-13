import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UserQueryModel {
  @IsString()
  @IsOptional()
  sortBy?: string;

  @IsString()
  @IsOptional()
  sortDirection?: 1 | -1;

  @IsNumber()
  @IsOptional()
  pageNumber?: number;

  @IsNumber()
  @IsOptional()
  pageSize?: number;

  @IsString()
  @IsOptional()
  searchLoginTerm?: string | null = null;

  @IsString()
  @IsOptional()
  searchEmailTerm?: string | null = null;
}
