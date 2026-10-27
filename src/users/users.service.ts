import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { User } from './entities/user.entity.js';
import { FindAllQuery } from './users.controller.js';

@Injectable()
export class UsersService {
  private users: Array<User>;

  constructor() {
    this.users = [];
  }

  create(createUserDto: CreateUserDto) {
    const user: User = {
      id: this.users.length + 1,
      ...createUserDto,
    };
    this.users.push(user);
    return user;
  }

  findAll(query: FindAllQuery) {
    if (query.limit) {
      return this.users.slice(0, query.limit);
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new HttpException(
        `User with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);
    Object.assign(user, updateUserDto);
    return user;
  }

  remove(id: number) {
    const user = this.findOne(id);
    this.users = this.users.filter((u) => u.id !== id);
    return user;
  }
}
