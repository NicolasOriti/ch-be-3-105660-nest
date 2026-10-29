import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { RegisterInput } from '../../domain/services/auth.service.js';

export class RegisterUserRequest {
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  static toDomainInput(request: RegisterUserRequest): RegisterInput {
    return {
      firstName: request.firstName,
      lastName: request.lastName,
      email: request.email.trim().toLowerCase(),
      password: request.password,
    };
  }
}
