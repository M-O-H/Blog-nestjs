import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SearchDto } from './dtos/search.dto';
import { isEmpty } from 'class-validator';
import { insertPost, selectPost } from '@/common/models/crud.model';
import { BusinessException } from '@/common/exceptions/business.exception';
import { PostsRepository } from './post.repository';
import { UpdatePostDto } from './dtos/update-post.dto';
import { CreatePostDto } from './dtos/Create-post.dto';
import { User } from '@/common/interface/user.interface';
import { Role } from '@/common/interface/role.interface';
import { CreateLikeDto } from './dtos/create-like.dto';
import { LikableType } from '@/common/interface/like.interface';
@Injectable()
export class PostService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async getPublicPosts(search: SearchDto) {
    let limit: number = Number(search.limit) || 10;
    const page: number = Number(search.page) || 1;
    const query = search?.query ? `%${search.query}%` : '';
    if (limit > 10) limit = 10;
    try {
      const publishedPosts: selectPost[] =
        await this.postsRepository.findPublic(page, limit, query);
      if (isEmpty(publishedPosts[0]))
        throw new NotFoundException('Post not found');
      // TODO: remove author's password on data query
      // publishedPosts.map((post: any) => {
      //   delete post.author.password;
      // });
      return publishedPosts;
    } catch (error) {
      throw new BusinessException('Posts', error);
    }
  }

  async getPost(postId: number) {
    try {
      const post: selectPost = await this.postsRepository.getById(postId);
      if (!post) throw new NotFoundException('Post not found');
      return post;
    } catch (error) {
      throw new BusinessException('Posts', error, postId);
    }
  }

  // not found - post with title exist -
  async createPost(userId: number, createPost: CreatePostDto) {
    try {
      const [createdPost]: insertPost[] = await this.postsRepository.create(
        userId,
        createPost,
      );
      return {
        message: 'Post created successfully',
        preview: createdPost,
      };
    } catch (error) {
      throw new BusinessException('Posts', error);
    }
  }

  async update(user: User, postId: number, updatePost: UpdatePostDto) {
    try {
      const post = await this.postsRepository.getById(postId);
      if (!post) throw new NotFoundException('Post not found');
      if (post.authorId != user.id && !user.role.includes(Role.ADMIN))
        throw new ForbiddenException('Permission Denied');
      const [updatedPost]: selectPost[] = await this.postsRepository.update(
        postId,
        updatePost,
      );
      return {
        message: 'Post updated successfully',
        preview: updatedPost,
      };
    } catch (error) {
      throw new BusinessException('Posts', error, postId);
    }
  }

  async delete(user: any, postId: number) {
    try {
      const post = await this.postsRepository.getById(postId);
      if (!post) throw new NotFoundException('Post not found');
      if (post.authorId != user.id && !user.role.includes(Role.ADMIN))
        throw new ForbiddenException('Permission Denied');
      const [deletedPost] = await this.postsRepository.deleteOne(postId);
      return {
        message: 'Post deleted successfully',
        deletedPost,
      };
    } catch (error) {
      throw new BusinessException('Posts', error, postId);
    }
  }

  async createLike(userId: number, createLike: CreateLikeDto) {
    if (!createLike.likableType.includes('post'))
      throw new BadRequestException('invalid type');

    const postId = createLike.likableId;

    const post = await this.postsRepository.getById(postId);
    if (!post) throw new NotFoundException('Post not found');

    const hasLike = post.likes.some((like) => like.userId === userId);

    if (hasLike) {
      const deletedRating = await this.postsRepository.deletRating(
        userId,
        postId,
      );
      return {
        message: 'like removed',
        deletedRating,
      };
    }

    const createdLike = await this.postsRepository.createLike(
      userId,
      postId,
      LikableType['Post'],
    );
    return {
      message: 'like created',
      createdLike,
    };
  }
}
