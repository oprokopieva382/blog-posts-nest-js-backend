import {
  Body,
  Controller,
  Request,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Get,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserInputModel } from '../user/DTOs/input/UserInputModel.dto';
import { LocalAuthGuard } from 'src/features/auth/guards/local-auth.guard';
import { UserQueryRepository } from '../user/user.query.repository';
import { CurrentUserId } from './decorators/currentUserId.param.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginInputModel } from './DTOs/input/LoginInputModel.dto';
import { ThrottlerGuard } from '@nestjs/throttler';
import { RegistrationConfirmationCodeModel } from './DTOs/input/RegistrationConfirmationCodeModel.dto';
import { RegistrationEmailResendingModel } from './DTOs/input/RegistrationEmailResendingModel.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userQueryRepository: UserQueryRepository,
  ) {}

  @Post('registration')
  @UseGuards(ThrottlerGuard)
  @HttpCode(204)
  async registerUser(@Body() dto: UserInputModel) {
    return await this.authService.registerUser(dto);
  }

  @Post('registration-confirmation')
  @UseGuards(ThrottlerGuard)
  @HttpCode(204)
  async confirmRegistration(@Body() dto: RegistrationConfirmationCodeModel) {
    return await this.authService.confirmRegistration(dto.code);
  }

  @Post('registration-email-resending')
  @UseGuards(ThrottlerGuard)
  @HttpCode(204)
  async registrationEmailResending(
    @Body() dto: RegistrationEmailResendingModel,
  ) {
    return await this.authService.registrationEmailResending(dto.email);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async loginUser(@Body() dto: LoginInputModel, @Request() req) {
    console.log('Req.user', req.user._doc._id);
    return await this.authService.loginUser(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async authMe(@CurrentUserId() currentUserId: string) {
    return await this.userQueryRepository.getByIdUser(currentUserId);
  }
}
