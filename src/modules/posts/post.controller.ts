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
import { SearchDto } from './dtos/search.dto';
import { PostService } from './post.service';
import { UpdatePostDto } from './dtos/update-post.dto';
import { CreateLikeDto } from './dtos/create-like.dto';
import { ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@UsePipes(ParseIntPipe)
@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) { }

  // ----------- Dev Routes ---------------- //
  @IsPublic()
  @ApiOperation({ summary: 'Get a list of published posts with pagination' })
  @ApiResponse({ status: 200, description: 'List of published posts' })
  @ApiNotFoundResponse({ description: 'No published posts found.' })
  @Get('/')
  async getPublishedPost(@Request() req, @Query() searchDto: SearchDto) {
    return await this.postService.getPublicPosts(searchDto);
  }

  // ----------- Private Routes ---------------- //
  @IsPublic()
  @ApiOperation({ summary: 'Get a post by ID' })
  @ApiResponse({ status: 200, description: 'Post details' })
  @ApiNotFoundResponse({ description: 'Post not found.' })
  @Get('search/:id')
  async getPost(@Param('id') postId: number) {
    return await this.postService.getPost(postId);
  }

  @Post('/')
  @ApiOperation({ summary: 'Create a new post' })
  @ApiBody({ description: 'Post data', type: CreatePostDto })
  @ApiResponse({ status: 201, description: 'Post created successfully.' })
  @ApiCreatedResponse({ description: 'Post created successfully.' })
  @ApiUnauthorizedResponse({ description: "Unauthorized" })
  async createPost(@Request() req, @Body() createPostDto: CreatePostDto) {
    const createdPost = await this.postService.createPost(
      req.user.id,
      createPostDto,
    );
    return createdPost;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing post' })
  @ApiBody({ description: 'Updated post data', type: UpdatePostDto })
  @ApiResponse({ status: 200, description: 'Post updated successfully.' })
  @ApiNotFoundResponse({ description: 'Post not found.' })
  async updatePost(
    @Request() req,
    @Param('id') postId: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return await this.postService.update(req.user, postId, updatePostDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a post' })
  @ApiResponse({ status: 200, description: 'Post deleted successfully.' })
  @ApiNotFoundResponse({ description: 'Post not found.' })
  async deletePost(@Request() req, @Param('id') postId: number) {
    return await this.postService.delete(req.user, postId);
  }

  @Post('/likes')
  @ApiOperation({ summary: 'Like a post' })
  @ApiBody({ description: 'Like data', type: CreateLikeDto })
  @ApiResponse({ status: 201, description: 'Like created successfully.' })
  @ApiCreatedResponse({ description: 'Like created successfully.' })
  @ApiNotFoundResponse({ description: 'Post not found.' })
  async createRating(@Request() req, @Body() createLike: CreateLikeDto) {
    return await this.postService.createLike(req.user.id, createLike);
  }
}
