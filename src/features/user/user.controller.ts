import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserInputModel } from './DTOs/input/UserInputModel.dto';
import { UserService } from './user.service';
import { UserQueryRepository } from './user.query.repository';
import { UserQueryModel } from './DTOs/input/UserQueryModel.dto';
import { userQueryFilter } from 'src/base/DTOs/utils/queryFilter';

@Controller('users')
export class UserController {
  constructor(
    protected userService: UserService,
    protected userQueryRepository: UserQueryRepository,
  ) {}

  @Get()
  async getUsers(@Query() query: UserQueryModel) {
    return await this.userQueryRepository.getUsers(userQueryFilter(query));

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
