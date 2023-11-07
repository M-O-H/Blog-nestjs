import { PG_CONNECTION } from '@/common/constants/pg.constants';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
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
        throw new BusinessException(
          'Posts',
          `Post with title: ${title} not found!`,
          'Post not found',
          HttpStatus.NOT_FOUND,
        );
      // publishedPosts.map((post) => {
      //   delete post.author.password;
      // });
      return publishedPosts;
    } catch (error) {
      throw error;
    }
  }

  async getPost(postId: number): Promise<Post> {
    try {
      const post: selectPost = await this.conn.query.posts.findFirst({
        where: eq(posts.id, postId),
        with: {
          author: true,
        },
        orderBy: posts.id,
      });
      if (!post)
        throw new BusinessException(
          'Users',
          `Post with id #${postId} not found`,
          'Post not found',
          HttpStatus.NOT_FOUND,
        );
      // delete post.author.password;
      return post;
    } catch (error) {
      throw error;
    }
  }
  // not found - post with title exist -
  async createPost(createPost: PostCreateInput): Promise<Post[]> {
    try {
      return await this.conn
        .insert(posts)
        .values({ authorId: 1, ...createPost })
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
        .where(
          and(eq(posts.authorId, updatePost.authorId), eq(posts.id, postId)),
        )
        .returning();
      if (!updatedPost)
        throw new BusinessException(
          'Posts',
          `Post with id #${postId} not found`,
          'Post not found',
          HttpStatus.NOT_FOUND,
        );
      return updatedPost;
    } catch (error) {
      throw error;
    }
  }

  async delete(userId: number, postId: number): Promise<Post> {
    try {
      const [deletedPost] = await this.conn
        .delete(posts)
        .where(and(eq(posts.id, postId), eq(posts.authorId, userId)))
        .returning();
      if (!deletedPost)
        throw new BusinessException(
          'Users',
          `Post with id #${postId} not found`,
          'Post not found',
          HttpStatus.NOT_FOUND,
        );
      return deletedPost;
    } catch (error) {
      throw error;
    }
  }
}
