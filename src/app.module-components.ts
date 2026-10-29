import { GetUsersUseCase } from './application/use-cases/get-users.use-case.js';
import { RegisterUserUseCase } from './application/use-cases/register-user.user-case.js';
import { UserService } from './domain/services/user.service.js';
import { AuthService } from './domain/services/auth.service.js';
import { UsersController } from './infrastructure/rest/users.controller.js';
import { SessionsController } from './infrastructure/rest/sessions.controller.js';

export const USE_CASES = [GetUsersUseCase, RegisterUserUseCase];

export const DOMAIN_SERVICES = [UserService, AuthService];

export const CONTROLLERS = [UsersController, SessionsController];
