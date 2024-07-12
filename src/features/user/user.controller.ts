import { Body, Controller, Delete, Get, HttpCode, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserInputModel } from './DTOs/input/UserInputModel.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(protected userService: UserService) {}

  @Get()
  async getUsers() {
    return await this.userService.getUsers();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(@Body() dto: UserInputModel) {
    return await this.userService.createUser(dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
