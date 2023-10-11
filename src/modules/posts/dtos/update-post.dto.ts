import { OmitType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';
import { CreatePostDto } from './Create-post.dto';

export class UpdatePostDto extends OmitType(CreatePostDto, [
  'authorId',
] as const) {
  @IsNumber()
  authorId: number;
}
