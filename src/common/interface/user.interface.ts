export interface UserRquiredProps {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface UserOptionalProps {
  role: any; // Replace with proper enum type
  createdAt: string;
  updatedAt: string;
}

export interface User extends UserRquiredProps, UserOptionalProps {}

export interface UserCreateInput extends Omit<User, 'id'> {}

export interface UserUpdateInput extends Pick<UserRquiredProps, 'username'> {}
