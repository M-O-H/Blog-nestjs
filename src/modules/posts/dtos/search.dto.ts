import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class SearchDto {
  @IsString()
  @IsOptional()
  query: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  page: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  limit: number;
}
