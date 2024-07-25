import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/User.schema';
import { UserQueryRepository } from './user.query.repository';
import { AdminAuthGuard } from 'src/features/auth/guards/admin-auth.guard';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserQueryRepository, AdminAuthGuard],
})
export class UserModule {}
