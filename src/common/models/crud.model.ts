import { posts, users, comments, Role } from '@/database/schema';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export type insertUser = InferInsertModel<typeof users>;
export type selecttUser = InferSelectModel<typeof users>;

export type insertPost = InferInsertModel<typeof posts> & {
  cover?: string;
};

export type selectPost = InferSelectModel<typeof posts> & {
  cover?: string;
};

export type insertComments = InferInsertModel<typeof comments>;

export type selectComments = InferSelectModel<typeof comments>;

// Base type for all user-related operations
export interface BaseUser extends selecttUser {
  role: typeof Role.enumValues[number];
}

// Type for user responses
export type UserResponse = Omit<BaseUser, 'password'>;

// Update other interfaces to use BaseUser
export interface insertPostWithAuthorId extends insertPost {
  authorId: number;
}

type Author = {
  author: Omit<BaseUser, 'password'>;
};
export interface selectPostWithAuthor extends selectPost, Author { }

type CommentAuthor = {
  author: Omit<selecttUser, 'email' | 'password'>;
};
export interface selectCommentWithAuthor extends selectComments, CommentAuthor { }
