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
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from './dtos/pagination.dto';
import { UsersService } from './users.service';

@ApiTags('users') // Add a tag for the controller
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  // ----------- Public Routes ---------------- //
  @Get('profile')
  @ApiOperation({ summary: 'Get the profile of the authenticated user' })
  @ApiResponse({ status: 200, description: 'User profile retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async profile(@Request() req) {
    return await this.userService.findById(req.user.id);
  }

  @IsPublic()
  @Get('profile/:username')
  @ApiOperation({ summary: 'Get user profile by username' })
  @ApiParam({ name: 'username', description: 'The username of the user' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findUserByUsername(@Param('username') username: string) {
    return await this.userService.findOneByUsername(username);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: '(admin) Update the role of a user' })
  @ApiParam({ name: 'id', description: 'The ID of the user' })
  @ApiResponse({ status: 200, description: 'User role updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async updateRole(@Param('id') userId: number, @Body('role') roleDto: string) {
    return await this.userService.updateRole(userId, roleDto);
  }

  // ----------- Private Routes ---------------- //
  @Get()
  @ApiOperation({ summary: 'Get a list of users with pagination' })
  @ApiResponse({ status: 200, description: 'List of users retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(@Query() paginationDto: PaginationDto) {
    return await this.userService.find(paginationDto);
  }
}
