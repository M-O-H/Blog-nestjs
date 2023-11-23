import {
  selectPost,
  insertPost,
  insertUser,
  selectComments,
} from '../models/crud.model';

export interface Post extends selectPost {}
export interface PostCreateInput extends Omit<insertPost, 'id' | 'authorId'> {}
export interface PostUpdateInput extends Partial<PostCreateInput> {}
export interface PostWithAuthor extends Post {
  author: Omit<insertUser, 'password'>;
}
export interface PostWithComments extends Post {
  comments: selectComments[];
}
