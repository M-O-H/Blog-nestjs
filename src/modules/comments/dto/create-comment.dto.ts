import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'The content of the comment.',
    type: String,
    required: true,
    example: 'Very informative post.',
  })
  @IsString()
  text: string;

  @ApiProperty({
    description: 'The ID of the post to which the comment belongs.',
    type: Number,
    required: true,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  postId: number;
}
