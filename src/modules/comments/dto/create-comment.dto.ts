import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment',
    type: String,
    required: true,
  })
  @IsString()
  text: string;

  @ApiProperty({
    description: 'PostID',
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  postId: number;
}
