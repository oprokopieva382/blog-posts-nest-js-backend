import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/User.schema';
import { UserQueryRepository } from './user.query.repository';
import { AuthModule } from '../auth/auth.module';
import { TransformUser } from './DTOs/output/TransformUser';
import { CreateUserUseCase } from './use-cases/createUser-use.case';
import { CqrsModule } from '@nestjs/cqrs';
import { DeleteUserUseCase } from './use-cases/deleteUser-use.case';

@Module({
  imports: [
    CqrsModule,
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    UserQueryRepository,
    TransformUser,
    CreateUserUseCase,
    DeleteUserUseCase,
  ],
  exports: [UserQueryRepository, TransformUser, MongooseModule],
})
export class UserModule {}
