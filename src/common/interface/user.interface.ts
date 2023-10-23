import { insertUser } from '../models/crud.model';

export interface User extends Omit<insertUser, 'password'> {}

export interface UserCreateInput extends insertUser {}

export interface UpdateUserRole extends Pick<User, 'role'> {}
