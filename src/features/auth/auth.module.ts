import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { User, UserSchema } from '../user/schemas/User.schema';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { LocalStrategy } from 'src/features/auth/strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserQueryRepository } from '../user/user.query.repository';
import { JwtStrategy } from './strategies/jwt.strategy';
import { EmailService } from 'src/base/application/email.service';
import { PasswordRecoveryCode, PasswordRecoveryCodeSchema } from './schemas/PasswordRecoveryCode.schema';
import { SetNewPasswordUseCase } from './use-cases/setNewPassword-use-case';
import { CqrsModule } from '@nestjs/cqrs';
import { LoginUserUseCase } from './use-cases/loginUser-use-case';
import { RegisterUserUseCase } from './use-cases/registerUser-use-case';
import { ConfirmationRegistrationUserUseCase } from './use-cases/confirmationRegistration-use-case';
import { RegistrationEmailResendingUseCase } from './use-cases/registrationEmailResending-use-case';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: PasswordRecoveryCode.name,
        schema: PasswordRecoveryCodeSchema,
      },
    ]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: { expiresIn: '5m' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    LocalStrategy,
    JwtStrategy,
    UserQueryRepository,
    EmailService,
    SetNewPasswordUseCase,
    LoginUserUseCase,
    RegisterUserUseCase,
    ConfirmationRegistrationUserUseCase,
    RegistrationEmailResendingUseCase,
  ],
  exports: [AuthService],
})
export class AuthModule {}
