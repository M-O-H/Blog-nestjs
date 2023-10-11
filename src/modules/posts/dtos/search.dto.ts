import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class SerachDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  offset: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  limit: number;
}
