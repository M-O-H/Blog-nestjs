import { posts, users } from '@/database/schema';
import { InferInsertModel, InferSelectModel } from 'drizzle-orm';

export type insertUser = InferInsertModel<typeof users>;

export type selecttUser = InferSelectModel<typeof users>;

export type insertPost = InferInsertModel<typeof posts>;

export type selectPost = InferSelectModel<typeof posts>;

export interface insertPostWithAuthorId
  extends insertPost,
    Pick<insertUser, 'id'> {}

type test = {
  author: Omit<selecttUser, 'password'>;
};
export interface selectPostWithAuthor extends selectPost, test {}
