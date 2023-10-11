import { PG_CONNECTION } from '@/common/constants/pg.constants';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as schema from '@/database/schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { posts } from '@/database/schema';
import { and, eq, like } from 'drizzle-orm';
import { SerachDto } from './dtos/search.dto';
import { isEmpty } from 'class-validator';
import {
  Post,
  PostCreateInput,
  PostUpdateInput,
} from '@/common/interface/post.interface';

@Injectable()
export class PostService {
  constructor(
    @Inject(PG_CONNECTION) private readonly conn: NodePgDatabase<typeof schema>,
  ) {}
  async getPublicPosts(search: SerachDto): Promise<Post[]> {
    let limit: number = Number(search.limit) || 10;
    const page: number = Number(search.offset - 1) * limit || 0;
    const title = search.title ? `%${search.title}%` : null;
    if (limit > 10) limit = 10;
    try {
      const publishedPosts = await this.conn
        .select()
        .from(posts)
        .where(
          and(
            eq(posts.published, true),
            like(posts.title, title || posts.title),
          ),
        )
        .limit(limit)
        .offset(page)
        .orderBy(posts.updatedAt);
      if (isEmpty(publishedPosts[0]))
        throw new NotFoundException(
          `Post with title:'${search.title}' not exits!`,
        );
      return publishedPosts;
    } catch (error) {
      throw error;
    }
  }

  async getPost(postId: number): Promise<Post> {
    try {
      const [post] = await this.conn
        .select()
        .from(posts)
        .where(eq(posts.id, postId));
      if (!post) throw new NotFoundException(`Post #${postId} not found`);
      return post;
    } catch (error) {
      throw error;
    }
  }

  async createPost(createPost: PostCreateInput): Promise<Post[]> {
    try {
      return await this.conn
        .insert(posts)
        .values(createPost)
        .onConflictDoNothing()
        .returning();
    } catch (error) {
      throw error;
    }
  }

  async update(postId: number, updatePost: PostUpdateInput): Promise<Post> {
    try {
      const [updatedPost] = await this.conn
        .update(posts)
        .set(updatePost)
        .where(eq(posts.id, postId))
        .returning();
      if (!updatedPost)
        throw new NotFoundException(`Post with id:#${postId} Not found`);
      return updatedPost;
    } catch (error) {
      throw error;
    }
  }

  async delete(postId: number): Promise<Post> {
    try {
      const [deletedPost] = await this.conn
        .delete(posts)
        .where(eq(posts.id, postId))
        .returning();
      if (!deletedPost)
        throw new NotFoundException(`Post with id:#${postId} Not found`);
      return deletedPost;
    } catch (error) {
      throw error;
    }
  }
}
