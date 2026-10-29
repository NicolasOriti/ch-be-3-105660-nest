import { Body, Controller, Post } from '@nestjs/common';

import { RegisterUserUseCase } from '../../application/use-cases/register-user.user-case.js';
import { RegisterUserRequest } from './register-user.request.js';
import { UserResponse } from './user.response.js';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly registerUser: RegisterUserUseCase) {}

  @Post('register')
  async register(@Body() body: RegisterUserRequest): Promise<UserResponse> {
    const user = await this.registerUser.execute(
      RegisterUserRequest.toDomainInput(body),
    );
    return UserResponse.fromDomain(user);
  }
}
