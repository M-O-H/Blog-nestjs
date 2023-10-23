import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class PaginationDto {
  @IsString()
  @IsOptional()
  email: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  offset: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  limit: number;
}
