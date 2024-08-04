import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/User.schema';
import { UserQueryRepository } from './user.query.repository';
import { AdminAuthGuard } from 'src/features/auth/guards/admin-auth.guard';
import { AuthModule } from '../auth/auth.module';
import { TransformUser } from './DTOs/output/TransformUser';
import { CreateUserUseCase } from './use-cases/createUser-use.case';
import { CqrsModule } from '@nestjs/cqrs';
import { DeleteUserUseCase } from './use-cases/deleteUser-use.case';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    UserQueryRepository,
    AdminAuthGuard,
    TransformUser,
    CreateUserUseCase,
    DeleteUserUseCase,
  ],
})
export class UserModule {}
