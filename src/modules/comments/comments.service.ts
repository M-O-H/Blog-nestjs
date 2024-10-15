import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  ParseIntPipe,
  UsePipes,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User } from '@/common/interface/user.interface';
import { QueryDto } from './dto/query.dto';
import { insertComments, selectComments } from '@/common/models/crud.model';
import { BusinessException } from '@/common/exceptions/business.exception';
import { Role } from '@/common/interface/role.interface';
import { CommentsRepository } from './comments.repository';
import { PostsRepository } from '../posts/post.repository';

@UsePipes(ParseIntPipe)
@Injectable()
export class CommentsService {
  constructor(
    private readonly CommentRepository: CommentsRepository,
    private readonly postsRepository: PostsRepository,
  ) { }

  async create(userId: number, data: CreateCommentDto) {
    try {
      const hasPost = await this.postsRepository.getById(data.postId);
      if (!hasPost || !hasPost.published)
        throw new NotFoundException('Post not found');
      const authorId = userId;
      const [createdComment]: insertComments[] =
        await this.CommentRepository.create({
          authorId,
          ...data,
        });
      return {
        message: 'Comment created successfully',
        preview: createdComment,
      };
    } catch (error) {
      throw new BusinessException('Comments', error, data.postId);
    }
  }

  async findAll(user: User, query: QueryDto) {
    try {
      let limit: number = Number(query.limit) || 10;
      const page: number = Number(query.page) || 1;
      if (limit > 10) limit = 10;
      if (!query.postId) {
        if (user && user.role != Role.ADMIN) return []; // findUserComment
        return this.CommentRepository.find(page, limit);
      }
      const userComment: selectComments[] =
        await this.CommentRepository.findByPostId(query.postId, page, limit);
      if (!userComment[0])
        throw new NotFoundException('No comments found on post');
      userComment.map((user) => {
        delete user.author.password; // TODO add types
      });
      return userComment;
    } catch (error) {
      throw new BusinessException('Comments', error, query?.postId);
    }
  }
  // handle long integer params
  async findOne(user: User, commentId: number) {
    try {
      const comment: selectComments =
        await this.CommentRepository.getById(commentId);
      if (!comment) throw new NotFoundException('Comment not found');
      if (comment.authorId != user.id && !user.role.includes(Role.ADMIN))
        throw new ForbiddenException('Permission Denied');
      return comment;
    } catch (error) {
      throw new BusinessException('Comments', error, commentId);
    }
  }

  async update(user: User, commentId: number, data: UpdateCommentDto) {
    try {
      const comment: selectComments =
        await this.CommentRepository.getById(commentId);
      if (!comment) throw new NotFoundException('Comment Not Found');
      if (comment.authorId != user.id && !user.role.includes(Role.ADMIN))
        throw new ForbiddenException('Permission Denied');
      const updaetdComment = await this.CommentRepository.update(
        commentId,
        data,
      );
      return {
        message: 'Comment updated successfully',
        preview: updaetdComment,
      };
    } catch (error) {
      throw new BusinessException('Comments', error, commentId);
    }
  }

  async remove(user: User, commentId: number) {
    try {
      const comment: selectComments =
        await this.CommentRepository.getById(commentId);
      if (!comment) throw new NotFoundException('Comment Not Found');
      if (comment.authorId != user.id && !user.role.includes(Role.ADMIN))
        throw new ForbiddenException('Permission Denied');
      const [deletedComment] =
        await this.CommentRepository.deleteOne(commentId);
      return {
        message: 'Comment deleted successfully',
        deletedComment,
      };
    } catch (error) {
      throw new BusinessException('Comments', error, commentId);
    }
  }
}

//TODO: interfaces - queries model
