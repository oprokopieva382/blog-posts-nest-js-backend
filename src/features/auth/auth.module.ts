import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { User, UserSchema } from '../user/schemas/User.schema';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { LocalStrategy } from 'src/base/strategies/local.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
