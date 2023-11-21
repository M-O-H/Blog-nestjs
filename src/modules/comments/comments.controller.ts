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
} from '@nestjs/common';
import { QueryDto } from './dto/query.dto';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ParseIntPipe } from '@/common/pipes/parse-int.pipe';
@UsePipes(ParseIntPipe)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Request() req, @Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(req.user.id, createCommentDto);
  }

  @Get('/')
  findAll(@Request() req, @Query() query: QueryDto) {
    return this.commentsService.findAll(req.user, query);
  }

  @Get(':id')
  findOne(@Request() req, @Param('id') commentId: number) {
    return this.commentsService.findOne(req.user, commentId);
  }

  @Patch(':id')
  update(
    @Request() req,
    @Param('id') commentId: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(req.user, commentId, updateCommentDto);
  }

  @Delete(':id')
  remove(@Request() req, @Param('id') commentId: number) {
    return this.commentsService.remove(req.user, commentId);
  }
}
