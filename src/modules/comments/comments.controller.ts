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
@UsePipes(ParseIntPipe)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Request() req, @Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(req.user.id, createCommentDto);
  }

  @Get()
  findAll(@Request() req, @Query() query: QueryDto) {
    return this.commentsService.findAll(req.user, query);
  }
  @UseGuards(new CheckUserRole([Role.USER, Role.ADMIN]))
  @Patch(':id')
  update(
    @Request() req,
    @Param('id') commentId: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(req.user, commentId, updateCommentDto);
  }

  @UseGuards(new CheckUserRole([Role.USER, Role.MANAGE_COMMENTS, Role.ADMIN]))
  @Delete(':id')
  remove(@Request() req, @Param('id') commentId: number) {
    return this.commentsService.remove(req.user, commentId);
  }
}
