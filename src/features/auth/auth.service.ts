import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from './auth.repository';
import { UserInputModel } from '../user/DTOs/input/UserInputModel.dto';
import { randomUUID } from 'crypto';
import { add } from 'date-fns/add';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
   ) {}

  async createHash(password: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async registerUser(dto: UserInputModel) {
    const findUser = await this.authRepository.getByLoginOrEmail(
      dto.login,
      dto.email,
    );

    if (findUser) {
      throw new BadRequestException();
    }

    const hashedPassword = await this.createHash(dto.password);

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
      },
    };

    return await this.authRepository.registerUser(userDto);
  }
}
