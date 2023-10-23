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
  @Get('')
  async findAll(@Query() paginationDto: PaginationDto) {
    return await this.userService.find(paginationDto);
  }

  @Get(':id')
  async findUserByid(@Param('id', ParseIntPipe) userId: number) {
    return await this.userService.findById(userId);
  }
  @Post('')
  async findUserByEmailOrUsername(@Body('input') body: string) {
    return await this.userService.findOneByEmailOrUsername(body);
  }

  @Post('/username')
  async findUserByUsername(@Body('username') username: string) {
    return await this.userService.findOneByUsername(username);
  }

  @Post('/email')
  async findUserByeEmail(@Body('email') email: string) {
    return await this.userService.findOneByEmail(email);
  }

  @Patch(':id')
  async createUser(
    @Param('id', ParseIntPipe) userId: number,
    @Body('role') role: string,
  ) {
    return await this.userService.updateRole(userId, role);
  }
}
