import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from './auth.repository';
import { UserInputModel } from '../user/DTOs/input/UserInputModel.dto';
import { randomUUID } from 'crypto';
import { add } from 'date-fns/add';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async createHash(password: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async testPassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  async validateUser(data: string, password: string): Promise<any> {
    const user = await this.authRepository.getByLoginOrEmail(data);
    const isPasswordCorrect = await this.testPassword(password, user.password);

    if (user && isPasswordCorrect) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async registerUser(dto: UserInputModel) {
    const findUser = await this.authRepository.getByLoginOrEmail(dto.login);

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

  async loginUser(user: any) {
    console.log("User in loginUser", user)
    const payload = { login: user._doc.login, sub: user._doc._id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
