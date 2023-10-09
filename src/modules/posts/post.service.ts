import { PG_CONNECTION } from '@/common/constants/pg.constants';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as schema from '@/database/schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { posts } from '@/database/schema';
import { and, eq } from 'drizzle-orm';
import { CreatePostDto } from './dtos/Create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { SerachDto } from './dtos/search.dto';
import { isEmpty } from 'class-validator';

@Injectable()
export class PostService {
  constructor(
    @Inject(PG_CONNECTION) private readonly conn: NodePgDatabase<typeof schema>,
  ) {}
  async getPublicPosts(search: SerachDto): Promise<object[]> {
    const limit: number = Number(search.limit) || 10;
    const page: number = Number(search.page) * limit || 0;
    try {
      const publishedPosts = await this.conn
        .select()
        .from(posts)
        .where(
          and(
            eq(posts.published, true || false),
            eq(posts.title, search.title || posts.title),
          ),
        )
        .orderBy(posts.updatedAt)
        .limit(limit)
        .offset(page);
      if (isEmpty(publishedPosts[0]))
        throw new NotFoundException(
          `Post with title:'${search.title}' not exits!`,
        );
      return publishedPosts;
    } catch (error) {
      throw error;
    }
  }

  async getPost(postId: number): Promise<object> {
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

  async createPost(createPostDto: CreatePostDto): Promise<object> {
    try {
      return await this.conn.insert(posts).values(createPostDto).returning();
    } catch (error) {
      throw error;
    }
  }

  async update(postId: number, updatePostDto: UpdatePostDto): Promise<object> {
    try {
      const [updatedPost] = await this.conn
        .update(posts)
        .set(updatePostDto)
        .where(eq(posts.id, postId))
        .returning();
      if (!updatedPost)
        throw new NotFoundException(`Post with id:#${postId} Not found`);
      return updatedPost;
    } catch (error) {
      throw error;
    }
  }

  async delete(postId: number): Promise<object> {
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
