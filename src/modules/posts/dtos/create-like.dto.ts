import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { LikableType } from '@/common/interface/like.interface';

export class CreateLikeDto {
  @ApiProperty({
    description: 'The ID of the likable entity',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  likableId: number;

  @ApiProperty({
    description: 'The type of the likable entity',
    enum: LikableType,
    example: LikableType.Post, // Ensure this is a valid example from LikableType enum
  })
  @IsNotEmpty()
  @IsEnum(LikableType)
  likableType: LikableType;
}
