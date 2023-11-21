import { IsPublic } from '@/common/decorator/public.decorator';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PaginationDto } from './dtos/pagination.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // ----------- Public Routes ---------------- //
  @IsPublic()
  @Get('profile/:name')
  async profile(@Param('name') username: string) {
    return await this.userService.findOneByEmail(username);
  }

  @IsPublic()
  @Post('/email')
  async findUserByeEmail(@Body('email') email: string) {
    return await this.userService.findOneByEmail(email);
  }

  // ----------- Private Routes ---------------- //
  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return await this.userService.find(paginationDto);
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) userId: number,
    @Body('role') role: string,
  ) {
    return await this.userService.updateRole(userId, role);
  }

  // ----------- Dev Routes ---------------- //
  @IsPublic()
  @Get(':id')
  async findUserByid(@Param('id', ParseIntPipe) userId: number) {
    return await this.userService.findById(userId);
  }
}
