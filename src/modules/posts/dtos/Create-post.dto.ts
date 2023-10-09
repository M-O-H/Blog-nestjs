import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;
  @IsString()
  content: string;
  @IsBoolean()
  @IsOptional()
  published: boolean;
}