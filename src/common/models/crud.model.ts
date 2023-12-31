import { posts, users, comments, rating } from '@/database/schema';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export type insertUser = InferInsertModel<typeof users>;

export type selecttUser = InferSelectModel<typeof users>;

export type insertPost = InferInsertModel<typeof posts>;

export type selectPost = InferSelectModel<typeof posts>;

export type insertComments = InferInsertModel<typeof comments>;

export type selectComments = InferSelectModel<typeof comments>;

export type insertRating = InferInsertModel<typeof rating>;

export type selectRating = InferSelectModel<typeof rating>;
export interface insertPostWithAuthorId
  extends insertPost,
    Pick<insertUser, 'id'> {}

type Author = {
  author: Omit<selecttUser, 'password'>;
};
export interface selectPostWithAuthor extends selectPost, Author {}
