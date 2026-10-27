import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

export type FindAllQuery = {
  limit?: number;
};

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    if (
      !createUserDto.first_name ||
      !createUserDto.email ||
      !createUserDto.password
    ) {
      throw new HttpException(
        'Missing required fields',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = this.usersService.create(createUserDto);
    return { status: 'success', user };
  }

  @Get()
  findAll(@Query() query: FindAllQuery) {
    const users = this.usersService.findAll(query);
    return { status: 'success', users };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const user = this.usersService.findOne(+id);
    return { status: 'success', user };
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = this.usersService.update(+id, updateUserDto);
    return { status: 'success', user };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const userRemoved = this.usersService.remove(+id);
    return { status: 'success', userRemoved };
  }
}
