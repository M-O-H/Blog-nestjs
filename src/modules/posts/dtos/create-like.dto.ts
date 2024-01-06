import { LikableType } from '@/common/interface/like.interface';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLikeDto {
  @IsNumber()
  @IsNotEmpty()
  likableId: number;

  @IsNotEmpty()
  @IsEnum(LikableType)
  likableType: string;
}
