import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserInputModel } from './DTOs/input/UserInputModel';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(protected userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Post()
  createUser(@Body() data: UserInputModel) {
    return this.userService.createUser(data);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
