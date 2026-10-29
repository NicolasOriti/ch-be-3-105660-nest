import { Inject, Injectable } from '@nestjs/common';
import {
  USER_REPOSITORY,
  type UserRepository,
} from '../ports/user.repository.js';
import { PublicUser, Role, toPublicUser } from '../models/user.js';

export interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: Role;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    // Password hasher
    // token service
  ) {}

  async register(input: RegisterInput): Promise<PublicUser> {
    const existingUser = await this.userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const newUser = await this.userRepository.create({
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      password: input.password,
      role: input.role ?? 'user',
      pets: [],
    });

    return toPublicUser(newUser);
  }
}
