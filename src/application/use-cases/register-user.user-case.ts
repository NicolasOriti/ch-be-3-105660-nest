import { Injectable } from '@nestjs/common';
import { PublicUser } from '../../domain/models/user.js';
import {
  AuthService,
  RegisterInput,
} from '../../domain/services/auth.service.js';

@Injectable()
export class RegisterUserUseCase {
  constructor(private readonly authService: AuthService) {}

  execute(input: RegisterInput): Promise<PublicUser> {
    return this.authService.register(input);
  }
}
