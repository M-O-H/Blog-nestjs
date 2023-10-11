import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNumber()
  id: number;
  @IsString()
  title: string;
  @IsString()
  content: string;

  @IsBoolean()
  @IsOptional()
  published: boolean;

  @IsNumber()
  authorId: number;

  @IsString()
  @IsOptional()
  cover: string;
}
