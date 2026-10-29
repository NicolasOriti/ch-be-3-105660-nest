import { Injectable, Inject } from '@nestjs/common';
import {
  type UserRepository,
  USER_REPOSITORY,
} from '../ports/user.repository.js';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  async findAll() {
    const users = await this.userRepository.findAll();
    return users;
  }
}
