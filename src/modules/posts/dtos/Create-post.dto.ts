import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'Title of post',
    type: String,
    required: true,
    minLength: 70,
    example: "The Arch"
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Content of post',
    type: String,
    required: true,
    minLength: 250,
  })
  @IsString()
  content: string;

  @ApiProperty({
    description: 'Post status',
    type: Boolean,
    default: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  published: boolean = false;

  @ApiProperty({
    description: 'Post cover',
    type: String,
    required: false,
    default: '../../assets/covers/sdc.png',
  })
  @IsString()
  @IsOptional()
  cover: string = '../../assets/covers/sdc.png';

  @ApiProperty({
    description: 'Post Tags',
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({
    description: 'Post creation date',
    type: String,
    format: 'date-time',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  createdAt?: string;

  @ApiProperty({
    description: 'Post update date',
    type: String,
    format: 'date-time',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  updatedAt?: string;
}
