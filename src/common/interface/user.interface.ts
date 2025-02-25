import { BaseUser, UserResponse, insertUser } from '../models/crud.model';

export type User = UserResponse;  // Use the response type directly

export interface UserCreateInput extends insertUser {}

export interface UpdateUserRole extends Pick<BaseUser, 'role'> {}
