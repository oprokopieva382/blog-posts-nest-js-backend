import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserInputModel } from './DTOs/input/UserInputModel';

@Controller('users')
export class UserController {
  @Get()
  getUsers() {}

  @Post()
  createUser(@Body() data: UserInputModel) {
    return {
      login: data.login,
      password: data.password,
      email: data.email,
    };
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {}
}
