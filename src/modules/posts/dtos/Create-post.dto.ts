import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'Title of post',
    type: String,
    required: true,
    minimum: 70,
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Content of post',
    type: String,
    required: true,
    minimum: 250,
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
  published: boolean;

  @ApiProperty({
    description: 'Post cover',
    type: String,
    required: false,
    default: '../../assets/covers/sdc.png',
  })
  @IsString()
  @IsOptional()
  cover: string;

  @ApiProperty({
    description: 'Post Tags',
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsString({ each: true })
  tags: string;
  // TODO: fix tage type to string[] + property

  @ApiProperty({
    description: 'Post creation date',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsDateString()
  createdAt?: string;

  @ApiProperty({
    description: 'Post udpate date',
    type: String,
    required: false,
  })
  @IsOptional()
  @IsDateString()
  updatedAt?: string;
}
