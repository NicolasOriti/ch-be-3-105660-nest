import { Injectable } from '@nestjs/common';
import { UserService } from '../../domain/services/user.service.js';

@Injectable()
export class GetUsersUseCase {
  constructor(private readonly userService: UserService) {}

  execute() {
    return this.userService.findAll();
  }
}
