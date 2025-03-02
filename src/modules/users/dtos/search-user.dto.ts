import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchDto {
  @ApiProperty({
    description: 'The email or username to search for',
    example: 'example@example.com or username123',
  })
  @IsString()
  emailOrUsername: string;
}
