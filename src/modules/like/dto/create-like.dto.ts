import { ApiProperty } from '@nestjs/swagger';
import { LikableType } from '@/common/interface/like.interface';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class CreateLikeDto {
  @ApiProperty({
    description: 'like post',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsEnum(LikableType)
  likableType: string;
}
