import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class QueryDto {
  @ApiProperty({
    description: 'The ID of the post to filter comments by.',
    type: Number,
    required: false,
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  postId?: number;

  @ApiProperty({
    description: 'The page number for pagination.',
    type: Number,
    required: false,
    example: 1,
  })
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiProperty({
    description: 'The number of items per page.',
    type: Number,
    required: false,
    example: 10,
  })
  @IsNumber()
  @IsOptional()
  limit?: number;
}
