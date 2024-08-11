import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { LocalStrategy } from 'src/features/auth/strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { EmailService } from 'src/base/application/email.service';
import {
  PasswordRecoveryCode,
  PasswordRecoveryCodeSchema,
} from './schemas/PasswordRecoveryCode.schema';
import { SetNewPasswordUseCase } from './use-cases/setNewPassword-use-case';
import { CqrsModule } from '@nestjs/cqrs';
import { LoginUserUseCase } from './use-cases/loginUser-use-case';
import { RegisterUserUseCase } from './use-cases/registerUser-use-case';
import { ConfirmationRegistrationUserUseCase } from './use-cases/confirmationRegistration-use-case';
import { RegistrationEmailResendingUseCase } from './use-cases/registrationEmailResending-use-case';
import { PasswordRecoveryUseCase } from './use-cases/passwordRecovery-use-case';
import { AdminAuthGuard } from './guards/admin-auth.guard';
import { appSettings } from 'src/settings/app-settings';

@Module({
  imports: [
    CqrsModule,
    forwardRef(() => UserModule),
    MongooseModule.forFeature([
      {
        name: PasswordRecoveryCode.name,
        schema: PasswordRecoveryCodeSchema,
      },
    ]),
    PassportModule,
    JwtModule.registerAsync({
        useFactory: async () => ({
        secret: appSettings.api.JWT_ACCESS_TOKEN_SECRET,
        signOptions: { expiresIn: '5m' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    LocalStrategy,
    JwtStrategy,
    EmailService,
    SetNewPasswordUseCase,
    LoginUserUseCase,
    RegisterUserUseCase,
    ConfirmationRegistrationUserUseCase,
    RegistrationEmailResendingUseCase,
    PasswordRecoveryUseCase,
    AdminAuthGuard,
  ],
  exports: [AuthService],
})
export class AuthModule {}
