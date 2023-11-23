import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsBoolean()
  @IsOptional()
  published: boolean;

  @IsString()
  @IsOptional()
  cover: string;

  @IsOptional()
  @IsString()
  tags: string;

  @IsOptional()
  @IsDateString()
  createdAt?: string;

  @IsOptional()
  @IsDateString()
  updatedAt?: string;
}
