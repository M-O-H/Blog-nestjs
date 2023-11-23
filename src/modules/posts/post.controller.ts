import { ParseIntPipe } from '@/common/pipes/parse-int.pipe';
import { IsPublic } from '@/common/decorator/public.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UsePipes,
} from '@nestjs/common';
import { CreatePostDto } from './dtos/Create-post.dto';
import { SerachDto } from './dtos/search.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { PostService } from './post.service';

@UsePipes(ParseIntPipe)
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}
  // ----------- Dev Routes ---------------- //
  @IsPublic()
  @Get('/')
  async getPublishedPost(@Query() searchDto: SerachDto) {
    return await this.postService.getPublicPosts(searchDto);
  }

  // ----------- Private Routes ---------------- //
  @Get(':id')
  async getPost(@Param('id') postId: number) {
    return await this.postService.getPost(postId);
  }

  @Post()
  async createPost(@Request() req, @Body() createPostDto: CreatePostDto) {
    console.log(req.headers);
    return await this.postService.createPost(req.user.id, createPostDto);
  }

  @Patch(':id')
  async updatePost(
    @Request() req,
    @Param('id') postId: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return await this.postService.update(req.user, postId, updatePostDto);
  }

  @Delete(':id')
  async deletePost(@Request() req, @Param('id') postId: number) {
    return await this.postService.delete(req.user, postId);
  }
}
