import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  Query,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { QueryDto } from './dto/query.dto';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ParseIntPipe } from '@/common/pipes/parse-int.pipe';
import { CheckUserRole } from '@/common/guards/check-role.gaurd';
import { Role } from '@/common/interface/role.interface';
import { IsPublic } from '@/common/decorator/public.decorator';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOperation, ApiQuery, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
@UsePipes(ParseIntPipe)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @IsPublic()
  @ApiOperation({ summary: 'Get all comments' })
  @ApiBody({ description: 'Comments data', type: QueryDto })
  @ApiResponse({ status: 200, description: 'List of comments retrieved successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  @ApiQuery({ name: 'query', type: QueryDto, required: false })
  @Get('')
  findAll(@Request() req, @Query() query: QueryDto) {
    return this.commentsService.findAll(req.user, query);
  }

  @Post('create')
  @ApiOperation({ summary: 'Create a new comment' })
  @ApiBody({ description: 'Comment data', type: CreateCommentDto })
  @ApiResponse({ status: 201, description: 'Post created successfully.' })
  @ApiCreatedResponse({ description: 'Comment created successfully.' })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  create(@Request() req, @Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(req.user.id, createCommentDto);
  }

  @UseGuards(new CheckUserRole([Role.USER, Role.ADMIN]))
  @Patch(':id')
  @ApiOperation({ summary: 'update an existing comment' })
  @ApiBody({ description: 'Comment data', type: UpdateCommentDto })
  @ApiResponse({ status: 200, description: 'Comment created successfully.' })
  @ApiCreatedResponse({ description: 'Comment created successfully.' })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  update(
    @Request() req,
    @Param('id') commentId: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(req.user, commentId, updateCommentDto);
  }

  @UseGuards(new CheckUserRole([Role.USER, Role.MANAGE_COMMENTS, Role.ADMIN]))
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a comment' })
  @ApiResponse({ status: 200, description: 'Comment deleted successfully.' })
  @ApiCreatedResponse({ description: 'Comment created successfully.' })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  remove(@Request() req, @Param('id') commentId: number) {
    return this.commentsService.remove(req.user, commentId);
  }
}
