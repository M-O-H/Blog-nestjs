import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class SearchDto {
  @ApiProperty({
    description: 'Search query',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  query?: string;

  @ApiProperty({
    description: 'Text query',
    type: String,
    required: false,
    example: "Cat"
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({
    description: 'Page number for pagination',
    type: Number,
    required: false,
    default: 1,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  page?: number = 1;

  @ApiProperty({
    description: 'Limit number of results per page',
    type: Number,
    required: false,
    default: 10,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  limit?: number = 10;
}
