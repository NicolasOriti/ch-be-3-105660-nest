export type Role = 'user' | 'admin';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
  pets: string[];
}

export type PublicUser = Omit<User, 'password'>;

export type NewUserInput = Omit<User, 'id'>;

export function toPublicUser(user: User): PublicUser {
  const { password: _password, ...publicUser } = user;
  return publicUser;
}
