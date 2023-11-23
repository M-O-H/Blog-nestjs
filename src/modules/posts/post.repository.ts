import { PG_CONNECTION } from '@/common/constants/pg.constants';
import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '@/database/schema';
import { posts } from '@/database/schema';
import { and, eq, like } from 'drizzle-orm';
import {
  Post,
  PostCreateInput,
  PostUpdateInput,
  PostWithAuthor,
  PostWithComments,
} from '@/common/interface/post.interface';

@Injectable()
export class PostsRepository {
  constructor(
    @Inject(PG_CONNECTION) private readonly db: NodePgDatabase<typeof schema>,
  ) {
    console.log('POST PROVIDE INSTANTIVATE');
  }
  async create(userId: number, input: PostCreateInput) {
    return this.db
      .insert(posts)
      .values({ authorId: userId, ...input })
      .onConflictDoNothing()
      .returning();
  }

  async getById(id: number): Promise<Post | undefined> {
    return this.db.query.posts.findFirst({
      where: eq(posts.id, id),
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
      with: { author: true },
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
}
