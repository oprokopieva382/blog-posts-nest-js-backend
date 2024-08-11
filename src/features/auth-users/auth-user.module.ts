import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { EmailService } from 'src/base/application/email.service';
import {
  PasswordRecoveryCode,
  PasswordRecoveryCodeSchema,
} from './auth/schemas/PasswordRecoveryCode.schema';
import { appSettings } from 'src/settings/app-settings';
import { User, UserSchema } from './user/schemas/User.schema';
import { UserController } from './user/user.controller';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { AuthRepository } from './auth/auth.repository';
import { UserRepository } from './user/user.repository';
import { UserQueryRepository } from './user/user.query.repository';
import { LocalStrategy } from './auth/strategies/local.strategy';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { SetNewPasswordUseCase } from './auth/use-cases/setNewPassword-use-case';
import { LoginUserUseCase } from './auth/use-cases/loginUser-use-case';
import { RegisterUserUseCase } from './auth/use-cases/registerUser-use-case';
import { ConfirmationRegistrationUserUseCase } from './auth/use-cases/confirmationRegistration-use-case';
import { RegistrationEmailResendingUseCase } from './auth/use-cases/registrationEmailResending-use-case';
import { PasswordRecoveryUseCase } from './auth/use-cases/passwordRecovery-use-case';
import { CreateUserUseCase } from './user/use-cases/createUser-use.case';
import { DeleteUserUseCase } from './user/use-cases/deleteUser-use.case';
import { TransformUser } from './user/DTOs/output/TransformUser';
import { AdminAuthGuard } from './auth/guards/admin-auth.guard';
import { Session, SessionSchema } from './auth/schemas/Session.schema';
import { CreateSessionCommand } from './auth/use-cases/createSession-use-case';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: PasswordRecoveryCode.name,
        schema: PasswordRecoveryCodeSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Session.name,
        schema: SessionSchema,
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
  controllers: [AuthController, UserController],
  providers: [
    AuthService,
    UserService,
    AuthRepository,
    UserRepository,
    UserQueryRepository,
    LocalStrategy,
    JwtStrategy,
    EmailService,
    SetNewPasswordUseCase,
    LoginUserUseCase,
    RegisterUserUseCase,
    ConfirmationRegistrationUserUseCase,
    RegistrationEmailResendingUseCase,
    PasswordRecoveryUseCase,
    CreateSessionCommand,
    CreateUserUseCase,
    DeleteUserUseCase,
    AdminAuthGuard,
    TransformUser,
  ],
  exports: [],
})
export class AuthUserModule {}
