import { IsString } from 'class-validator';

export class searchDto {
  @IsString()
  emailOrUsername: string;
}
