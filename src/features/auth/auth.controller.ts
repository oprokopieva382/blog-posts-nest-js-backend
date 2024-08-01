import {
  Body,
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  HttpCode,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UserInputModel } from '../user/DTOs/input/UserInputModel.dto';
import { LocalAuthGuard } from 'src/features/auth/guards/local-auth.guard';
import { UserQueryRepository } from '../user/user.query.repository';
import { CurrentUserId } from './decorators/currentUserId.param.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ThrottlerGuard } from '@nestjs/throttler';
import { RegistrationConfirmationCodeModel } from './DTOs/input/RegistrationConfirmationCodeModel.dto';
import { RegistrationEmailResendingModel } from './DTOs/input/RegistrationEmailResendingModel.dto';
import { PasswordRecoveryInputModel } from './DTOs/input/PasswordRecoveryInputModel.dto';
import { NewPasswordRecoveryInputModel } from './DTOs/input/NewPasswordRecoveryInputModel.dto';
import { CommandBus } from '@nestjs/cqrs';
import { SetNewPasswordCommand } from './use-cases/setNewPassword-use-case';
import { LoginUserCommand } from './use-cases/loginUser-use-case';
import { RegisterUserCommand } from './use-cases/registerUser-use-case';
import { ConfirmationRegistrationUserCommand } from './use-cases/confirmationRegistration-use-case';
import { RegistrationEmailResendingCommand } from './use-cases/registrationEmailResending-use-case';
import { PasswordRecoveryCommand } from './use-cases/passwordRecovery-use-case';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userQueryRepository: UserQueryRepository,
    private readonly commandBus: CommandBus,
  ) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async authMe(@CurrentUserId() currentUserId: string) {
    return await this.userQueryRepository.getByIdUser(currentUserId);
  }

  @Post('registration')
  @UseGuards(ThrottlerGuard)
  @HttpCode(204)
  async registerUser(@Body() dto: UserInputModel) {
    return await this.commandBus.execute(new RegisterUserCommand(dto));
  }

  @Post('registration-confirmation')
  @UseGuards(ThrottlerGuard)
  @HttpCode(204)
  async confirmRegistration(@Body() dto: RegistrationConfirmationCodeModel) {
    return await this.commandBus.execute(
      new ConfirmationRegistrationUserCommand(dto.code),
    );
  }

  @Post('registration-email-resending')
  @UseGuards(ThrottlerGuard)
  @HttpCode(204)
  async registrationEmailResending(
    @Body() dto: RegistrationEmailResendingModel,
  ) {
    return await this.commandBus.execute(
      new RegistrationEmailResendingCommand(dto.email),
    );
  }

  @Post('password-recovery')
  @UseGuards(ThrottlerGuard)
  @HttpCode(204)
  async passwordRecovery(@Body() dto: PasswordRecoveryInputModel) {
    return await this.commandBus.execute(
      new PasswordRecoveryCommand(dto.email),
    );
  }

  @Post('new-password')
  @UseGuards(ThrottlerGuard)
  @HttpCode(204)
  async setNewPassword(@Body() dto: NewPasswordRecoveryInputModel) {
    return await this.commandBus.execute(new SetNewPasswordCommand(dto));
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  async loginUser(
    //@Body() dto: LoginInputModel,
    @Request() req,
    @Res({ passthrough: true }) response: Response,
  ) {
    //console.log('Req.user in login', req.user);
    const { accessToken, refreshToken } = await this.commandBus.execute(
      new LoginUserCommand(req.user, req.ip, req.headers),
    );

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
    });
    return { accessToken };
  }
}
