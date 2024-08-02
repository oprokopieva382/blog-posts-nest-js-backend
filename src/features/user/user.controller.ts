import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserInputModel } from './DTOs/input/UserInputModel.dto';
import { UserService } from './user.service';
import { UserQueryRepository } from './user.query.repository';
import { UserQueryModel } from './DTOs/input/UserQueryModel.dto';
import { userQueryFilter } from 'src/base/utils/queryFilter';
import { AdminAuthGuard } from 'src/features/auth/guards/admin-auth.guard';
import { TransformUser } from './DTOs/output/TransformUser';

@Controller('users')
@UseGuards(AdminAuthGuard)
export class UserController {
  constructor(
    protected userService: UserService,
    protected userQueryRepository: UserQueryRepository,
    private readonly TransformUser: TransformUser,
  ) {}

  @Get()
  async getUsers(@Query() query: UserQueryModel) {
    return await this.userQueryRepository.getUsers(userQueryFilter(query));
  }

  @Post()
  async createUser(@Body() dto: UserInputModel) {
    const result = await this.userService.createUser(dto);
    return this.TransformUser.transformToViewModel(result);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteUser(@Param('id') id: string) {
    const result = await this.userService.deleteUser(id);
    if (!result) {
      throw new NotFoundException();
    }
  }
}
