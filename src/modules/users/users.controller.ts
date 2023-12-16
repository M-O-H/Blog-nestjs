import { IsPublic } from '@/common/decorator/public.decorator';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  Request,
} from '@nestjs/common';
import { PaginationDto } from './dtos/pagination.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // ----------- Public Routes ---------------- //
  @Get('profile/@me')
  async profile(@Request() req) {
    console.log(req.user);
    return await this.userService.findById(req.user.id);
  }

  @IsPublic()
  @Get('profile/:username')
  async findUserByeEmail(@Param('username') username: string) {
    return await this.userService.findOneByUsername(username);
  }

  @Patch('update/:id')
  async updateRole(@Param('id') userId: number, @Body('role') roleDto: string) {
    return await this.userService.updateRole(userId, roleDto);
  }

  // ----------- Private Routes ---------------- //
  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return await this.userService.find(paginationDto);
  }
}
