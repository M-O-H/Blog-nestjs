import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreatePostDto } from './dtos/Create-post.dto';
import { SerachDto } from './dtos/search.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Get('/')
  async getPublicPost(@Query() searchDto: SerachDto) {
    return await this.postService.getPublicPosts(searchDto);
  }
  @Get(':id')
  async getPost(@Param('id', ParseIntPipe) postId: number) {
    return await this.postService.getPost(postId);
  }

  @Post('')
  async createPost(@Body() createPostDto: CreatePostDto) {
    return await this.postService.createPost(createPostDto);
  }

  @Patch(':id')
  async updatePost(
    @Param('id', ParseIntPipe) postId: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return await this.postService.update(Number(postId), updatePostDto);
  }

  @Delete(':id')
  async deletePost(@Param('id', ParseIntPipe) postId: string) {
    return await this.postService.delete(+postId);
  }
}
