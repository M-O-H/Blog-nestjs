import { Role } from '@/common/interface/role.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class UpdateRoleDto {
  @ApiProperty({
    description: 'user role',
    enum: Role,
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsEnum(Role)
  @IsString()
  role: string;
}
