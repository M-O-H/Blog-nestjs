import { PG_CONNECTION } from '@/common/constants/pg.constants';
import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@/database/schema';
import { comments } from '@/database/schema';
import { and, eq } from 'drizzle-orm';
import {
  Comment,
  CommentCreateInput,
  CommentWitRelation,
} from '@/common/interface/comment.interface';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsRepository {
  constructor(
    @Inject(PG_CONNECTION) private readonly db: NodePgDatabase<typeof schema>,
  ) { }
  async create(input: CommentCreateInput) {
    return this.db.insert(comments).values(input).returning();
  }

  async getById(id: number): Promise<CommentWitRelation | undefined> {
    return this.db.query.comments.findFirst({
      where: eq(comments.id, id),
      with: { author: true },
    });
  }

  async getCommentWithLikes(id: number): Promise<CommentWitRelation | any> {
    return await this.db.query.comments.findFirst({
      where: eq(comments.id, id),
      with: { author: true, likes: true },
    });
  }
  async find(page: number, limit: number): Promise<CommentWitRelation[] | any> {
    return this.db.query.comments.findMany({
      with: { author: true },
      limit: limit,
      offset: (page - 1) * limit,
    });
  }

  async findByPostId(
    id: number,
    page: number = 1,
    limit: number = 0,
  ): Promise<CommentWitRelation[]> {
    return this.db.query.comments.findMany({
      where: eq(comments.postId, id),
      with: { author: true, likes: true },
      limit: limit,
      offset: (page - 1) * limit,
    });
  }

  async findUserComments(
    userId: number,
    page: number,
    limit: number,
  ): Promise<CommentWitRelation[]> {
    return this.db.query.comments.findMany({
      where: eq(comments.authorId, userId),
      with: { author: true },
      limit: limit,
      offset: (page - 1) * limit,
    });
  }

  async update(id: number, data: UpdateCommentDto): Promise<Comment[]> {
    return this.db
      .update(comments)
      .set(data)
      .where(eq(comments.id, id))
      .returning();
  }

  async deleteOne(id: number): Promise<Comment[] | null> {
    return this.db.delete(comments).where(eq(comments.id, id)).returning();
  }

  async deleteCommentsByPostId(postId: number): Promise<Comment[] | null> {
    return this.db
      .delete(comments)
      .where(eq(comments.postId, postId))
      .returning();
  }

  async deleteUserCommentsByPostId(
    userId: number,
    postId: number,
  ): Promise<Comment[] | null> {
    return this.db
      .delete(comments)
      .where(and(eq(comments.authorId, userId), eq(comments.postId, postId)))
      .returning();
  }
}

// TODO: replace drizzle schema query with selection
