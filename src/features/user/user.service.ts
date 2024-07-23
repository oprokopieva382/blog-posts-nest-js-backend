import { Injectable } from '@nestjs/common';
import { add } from 'date-fns/add';
import { UserRepository } from './user.repository';
import { UserInputModel } from './DTOs/input/UserInputModel.dto';
import { AuthService } from '../auth/auth.service';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  async createUser(dto: UserInputModel) {
    const hashedPassword = await this.authService.createHash(dto.password)
    const userDto = {
      ...dto,
      password: hashedPassword,
      createdAt: new Date(),
      emailConfirmation: {
        confirmationCode: randomUUID(),
        expirationDate: add(new Date(), {
          hours: 1,
        }),
        isConfirmed: true,
      }
    };
    return await this.userRepository.createUser(userDto);
  }

  async deleteUser(id: string) {
    return await this.userRepository.deleteUser(id);
  }
}
