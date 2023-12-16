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
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CreatePostDto } from './dtos/Create-post.dto';
import { SerachDto } from './dtos/search.dto';
import { PostService } from './post.service';
import { CheckUserRole } from '@/common/guards/check-role.gaurd';
// import { Role, RoleType } from '@/common/interface/role.interface';
import { UpdatePostDto } from './dtos/update-post.dto';
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
  @Get('search/:id')
  async getPost(@Param('id') postId: number) {
    return await this.postService.getPost(postId);
  }

  @Post('/')
  async createPost(@Request() req, @Body() createPostDto: CreatePostDto) {
    // const uuid = uuidv4();
    // return uuid;
    const createdPost = await this.postService.createPost(
      req.user.id,
      createPostDto,
    );
    return createdPost;
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
  @UseGuards(new CheckUserRole([]))
  @Get('/private')
  async privatePosts() {
    return await this.postService.private();
  }
}
