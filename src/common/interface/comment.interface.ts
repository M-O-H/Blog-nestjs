import {
  insertComments,
  selectComments,
  selecttUser,
} from '../models/crud.model';

export interface Comment extends selectComments {}

export interface CommentCreateInput extends Omit<insertComments, 'id'> {}

export interface UpdateComment
  extends Partial<Omit<CommentCreateInput, 'postId'>> {}

export interface CommentWitRelation extends selectComments {
  author: Omit<selecttUser, 'password' | 'email'>;
}
