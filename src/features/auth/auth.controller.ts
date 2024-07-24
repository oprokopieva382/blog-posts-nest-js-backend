import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserInputModel } from '../user/DTOs/input/UserInputModel.dto';
import { LoginInputModel } from './DTOs/input/LoginInputModel.dto';
import { LocalAuthGuard } from 'src/base/guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(protected authService: AuthService) {}

  // @Get()
  // @UsePipes(new ValidationPipe({ transform: true }))
  // async getUsers(@Query() query: UserQueryModel) {
  //   return await this.userQueryRepository.getUsers(userQueryFilter(query));
  // }

  @Post('registration')
  @UseGuards(LocalAuthGuard)
  @UsePipes(new ValidationPipe())
  async loginUser(@Body() dto: LoginInputModel, @Request() req) {
    return req.user;
    //return await this.authService.loginUser(dto);
  }

  @Post('login')
  @HttpCode(204)
  @UsePipes(new ValidationPipe())
  async registerUser(@Body() dto: UserInputModel) {
    return await this.authService.registerUser(dto);
  }
}
