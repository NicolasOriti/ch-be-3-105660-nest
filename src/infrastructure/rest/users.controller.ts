import { Controller, Get, Query } from '@nestjs/common';

import { GetUsersUseCase } from '../../application/use-cases/get-users.use-case.js';

export type FindAllQuery = {
  limit?: number;
};

@Controller('users')
export class UsersController {
  constructor(private readonly getUsers: GetUsersUseCase) {}

  @Get()
  async findAll(@Query() query: FindAllQuery) {
    const users = await this.getUsers.execute();
    return { status: 'success', users };
  }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   if (
  //     !createUserDto.first_name ||
  //     !createUserDto.email ||
  //     !createUserDto.password
  //   ) {
  //     throw new HttpException(
  //       'Missing required fields',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  //   const user = this.usersService.create(createUserDto);
  //   return { status: 'success', user };
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   const user = this.usersService.findOne(+id);
  //   return { status: 'success', user };
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   const user = this.usersService.update(+id, updateUserDto);
  //   return { status: 'success', user };
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   const userRemoved = this.usersService.remove(+id);
  //   return { status: 'success', userRemoved };
  // }
}
