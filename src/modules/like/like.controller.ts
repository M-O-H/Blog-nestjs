import { Controller, Post, Body, Request, Param } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto } from './dto/create-like.dto';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) { }
  @Post('post/:postId')
  async likePost(
    @Request() req,
    @Param('postId') postId: number,
    @Body() likeType: CreateLikeDto,
  ) {
    return this.likeService.likePost(req.user.id, postId, likeType);
  }

  @Post('comment/:commentId')
  async likeComment(
    @Request() req,
    @Param('commentId') commentId: number,
    @Body() createLike: CreateLikeDto,
  ) {
    return this.likeService.likeComment(req.user.id, commentId, createLike);
  }
}
