import { IsNumber, IsOptional } from 'class-validator';

export class QueryDto {
  @IsNumber()
  @IsOptional()
  postId: number;
  @IsNumber()
  @IsOptional()
  page: number;
  @IsNumber()
  @IsOptional()
  limit: number;
}
