import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreatePostDto } from './Create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiProperty({
    description: 'The title of the post',
    example: 'Updated Post Title',
    required: false,
  })
  title?: string;

  @ApiProperty({
    description: 'The content of the post',
    example: 'This is the updated content of the post.',
    required: false,
  })
  content?: string;

  @ApiProperty({
    description: 'The status of the post',
    example: 'published',
    required: false,
  })
  status?: string;
}
