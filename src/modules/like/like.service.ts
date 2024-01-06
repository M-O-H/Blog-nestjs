import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikableType } from '@/common/interface/like.interface';
import { PostsRepository } from '../posts/post.repository';
import { CommentsRepository } from '../comments/comments.repository';
import { LikeRepository } from './like.repository';

@Injectable()
export class LikeService {
  constructor(
    private readonly likeRepository: LikeRepository,
    private readonly postsRepository: PostsRepository,
    private readonly commentsRepository: CommentsRepository,
  ) {}
  async likePost(
    userId: number,
    postId: number,
    createLike: CreateLikeDto,
  ): Promise<object> {
    if (!LikableType.Post.includes(createLike.likableType))
      throw new BadRequestException('invalid type');

    const post = await this.postsRepository.getById(postId);
    if (!post) throw new NotFoundException('Post not found');

    const hasLike = post.likes.some((like) => like.userId === userId);

    if (hasLike) {
      const deletedRating = await this.likeRepository.removeLike(
        userId,
        postId,
      );
      return {
        message: 'like removed',
        deletedRating,
      };
    }

    const createdLike = await this.likeRepository.createLike(
      userId,
      postId,
      LikableType['Post'],
    );
    return {
      message: 'like created',
      createdLike,
    };
  }

  async likeComment(
    userId: number,
    commentId: number,
    createLike: CreateLikeDto,
  ): Promise<object> {
    if (!LikableType.Comment.includes(createLike.likableType))
      throw new BadRequestException('invalid type');

    const comment =
      await this.commentsRepository.getCommentWithLikes(commentId);
    console.log(comment);
    if (!comment) throw new NotFoundException('Comment not found');

    const hasLike = comment.likes.some((like) => like.userId === userId);

    if (hasLike) {
      const removedLike = await this.likeRepository.removeLike(
        userId,
        commentId,
      );
      return {
        message: 'like removed',
        removedLike,
      };
    }

    const createdLike = await this.likeRepository.createLike(
      userId,
      commentId,
      LikableType['Comment'],
    );
    return {
      message: 'like created',
      createdLike,
    };
  }
}
