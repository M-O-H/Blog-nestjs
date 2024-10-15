import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    description: 'Username',
    type: String,
    minimum: 50,
    uniqueItems: true,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Email',
    type: String,
    minimum: 255,
    uniqueItems: true,
    required: true,
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'User Password',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
