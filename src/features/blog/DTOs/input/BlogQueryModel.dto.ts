import { IsNumber, IsOptional, IsString } from 'class-validator';

export class BlogQueryModel {
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
  searchNameTerm?: string | null = null;
}
