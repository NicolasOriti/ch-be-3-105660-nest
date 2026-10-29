import { NewUserInput, User } from '../models/user.js';
import { CrudRepository } from './crud.repository.js';

export const USER_REPOSITORY = 'UserRepository';

export interface UserRepository extends CrudRepository<User, NewUserInput> {
  findByEmail(email: string): Promise<User | null>;
}
