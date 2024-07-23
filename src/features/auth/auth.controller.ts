import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserInputModel } from '../user/DTOs/input/UserInputModel.dto';

@Controller('auth')
export class AuthController {
  constructor(protected authService: AuthService) {}

  // @Get()
  // @UsePipes(new ValidationPipe({ transform: true }))
  // async getUsers(@Query() query: UserQueryModel) {
  //   return await this.userQueryRepository.getUsers(userQueryFilter(query));
  // }

  @Post('registration')
  @HttpCode(204)
  @UsePipes(new ValidationPipe())
  async registerUser(@Body() dto: UserInputModel) {
    return await this.authService.registerUser(dto);
  }
}
