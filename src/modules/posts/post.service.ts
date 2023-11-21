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
import { selectPost } from '@/common/models/crud.model';
import { BusinessException } from '@/common/exceptions/business.exception';
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
      const publishedPosts: selectPost[] = await this.conn.query.posts.findMany(
        {
          where: and(
            eq(posts.published, true),
            like(posts.title, title || posts.title),
          ),
          limit: limit,
          offset: page,
          orderBy: posts.createdAt,
          with: { author: true },
        },
      );
      if (isEmpty(publishedPosts[0]))
        throw new NotFoundException('Post not found');
      // publishedPosts.map((post) => {
      //   delete post.author.password;
      // });
      return publishedPosts;
    } catch (error) {
      throw new BusinessException('Posts', error);
    }
  }

  async getPost(postId: number): Promise<Post> {
    try {
      const post: selectPost = await this.conn.query.posts.findFirst({
        where: eq(posts.id, postId),
        with: {
          author: true,
          comments: true,
        },
        orderBy: posts.id,
      });
      if (!post) throw new NotFoundException('Post not found');
      // delete post.author.password;
      return post;
    } catch (error) {
      throw new BusinessException('Posts', error, postId);
    }
  }
  // not found - post with title exist -
  async createPost(
    userId: number,
    createPost: PostCreateInput,
  ): Promise<Post[]> {
    try {
      return await this.conn
        .insert(posts)
        .values({ authorId: userId, ...createPost })
        .onConflictDoNothing()
        .returning();
    } catch (error) {
      throw new BusinessException('Posts', error);
    }
  }

  async update(
    userId: number,
    postId: number,
    updatePost: PostUpdateInput,
  ): Promise<Post> {
    try {
      const [updatedPost] = await this.conn
        .update(posts)
        .set(updatePost)
        .where(and(eq(posts.authorId, userId), eq(posts.id, postId)))
        .returning();
      if (!updatedPost) throw new NotFoundException('Post not found');
      return updatedPost;
    } catch (error) {
      throw new BusinessException('Posts', error, postId);
    }
  }

  async delete(userId: number, postId: number): Promise<Post> {
    try {
      const [deletedPost] = await this.conn
        .delete(posts)
        .where(and(eq(posts.authorId, userId), eq(posts.id, postId)))
        .returning();
      if (!deletedPost) throw new NotFoundException('Post not found');
      return deletedPost;
    } catch (error) {
      throw new BusinessException('Posts', error, postId);
    }
  }
}
