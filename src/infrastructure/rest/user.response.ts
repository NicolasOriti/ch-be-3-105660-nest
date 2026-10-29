import { PublicUser } from '../../domain/models/user.js';

export class UserResponse {
  constructor(
    readonly id: string,
    readonly firstName: string,
    readonly lastName: string,
    readonly email: string,
    readonly role: string,
    readonly pets: string[],
  ) {}

  static fromDomain(user: PublicUser): UserResponse {
    return new UserResponse(
      user.id,
      user.firstName,
      user.lastName,
      user.email,
      user.role,
      user.pets,
    );
  }
}
