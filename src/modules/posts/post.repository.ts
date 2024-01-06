import { PG_CONNECTION } from '@/common/constants/pg.constants';
import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@/database/schema';
import { posts, likes } from '@/database/schema';
import { and, eq, like } from 'drizzle-orm';
import {
  Post,
  PostCreateInput,
  PostUpdateInput,
  PostWithAuthor,
  PostWithComments,
} from '@/common/interface/post.interface';
import { LikableType } from '@/common/interface/like.interface';

@Injectable()
export class PostsRepository {
  constructor(
    @Inject(PG_CONNECTION) private readonly db: NodePgDatabase<typeof schema>,
  ) {}
  async create(userId: number, input: PostCreateInput) {
    console.log(userId);
    return this.db
      .insert(posts)
      .values({ authorId: userId, ...input })
      .onConflictDoNothing()
      .returning();
  }

  async getById(id: number): Promise<any | undefined> {
    return this.db.query.posts.findFirst({
      where: eq(posts.id, id),
      with: { likes: true },
    });
  }

  async findPublic(
    page: number,
    limit: number,
    title: string | null,
  ): Promise<PostWithAuthor[] | any> {
    return this.db.query.posts.findMany({
      where: and(
        eq(posts.published, true),
        like(posts.title, title || posts.title),
      ),
      with: { likes: true },
      limit: limit,
      offset: (page - 1) * limit,
      orderBy: posts.id,
    });
  }

  async findByUserId(id: number, page: number, limit: number): Promise<Post[]> {
    return this.db.query.posts.findMany({
      where: eq(posts.authorId, id),
      limit: limit,
      offset: (page - 1) * limit,
    });
  }

  async postWithComment(id: number): Promise<PostWithComments> {
    return this.db.query.posts.findFirst({
      where: eq(posts.id, id),
      with: { comments: true },
    });
  }

  async update(postId: number, data: PostUpdateInput): Promise<Post[]> {
    return await this.db
      .update(posts)
      .set(data)
      .where(eq(posts.id, postId))
      .returning();
  }

  async deleteOne(id: number): Promise<Post[] | null> {
    return this.db.delete(posts).where(eq(posts.id, id)).returning();
  }

  async deleteUserPosts(userId: number): Promise<Post[] | null> {
    return this.db.delete(posts).where(eq(posts.authorId, userId)).returning();
  }
  async getPrivatePosts() {
    return this.db.query.posts.findMany({
      where: eq(posts.published, false),
    });
  }

  async createLike(
    userId: number,
    likableId: number,
    likableType: LikableType,
  ) {
    return this.db
      .insert(likes)
      .values({
        userId,
        likableId,
        likableType,
      })
      .onConflictDoNothing()
      .returning();
  }
  async deletRating(userId: number, postId: number): Promise<any | undefined> {
    return await this.db
      .delete(likes)
      .where(and(eq(likes.userId, userId), eq(likes.likableId, postId)))
      .returning();
  }
  async deleteRateByPostId(postId: number) {
    return await this.db
      .delete(likes)
      .where(eq(likes.likableId, postId))
      .returning();
  }
}
