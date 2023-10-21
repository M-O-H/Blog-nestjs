import { ParseIntPipe } from '@/common/pipes/parse-int.pipe';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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
  @Get('/')
  async getPublicPost(@Query() searchDto: SerachDto) {
    return await this.postService.getPublicPosts(searchDto);
  }
  @Get(':id')
  async getPost(@Param('id') postId: number) {
    return await this.postService.getPost(postId);
  }

  @Post(':id')
  async createPost(
    @Param('id') userId: number,
    @Body() createPostDto: CreatePostDto,
  ) {
    return await this.postService.createPost(userId, createPostDto);
  }

  @Put(':id')
  async updatePost(
    @Param('id') postId: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return await this.postService.update(postId, updatePostDto);
  }

  @Delete(':id')
  async deletePost(@Param('id') postId: number) {
    const userId = 1;
    return await this.postService.delete(userId, postId);
  }
}
