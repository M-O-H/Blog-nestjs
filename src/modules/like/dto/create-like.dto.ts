import { LikableType } from '@/common/interface/like.interface';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class CreateLikeDto {
  @IsNotEmpty()
  @IsEnum(LikableType)
  likableType: string;
}
