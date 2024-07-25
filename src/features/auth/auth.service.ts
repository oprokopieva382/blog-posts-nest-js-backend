import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from './auth.repository';
import { UserInputModel } from '../user/DTOs/input/UserInputModel.dto';
import { randomUUID } from 'crypto';
import { add } from 'date-fns/add';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/base/application/email.service';
import { RegistrationConfirmationCodeModel } from './DTOs/input/RegistrationConfirmationCodeModel.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly emailService: EmailService,
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
    if (!user) {
      throw new UnauthorizedException();
    }
    const isPasswordCorrect = await this.testPassword(password, user.password);

    if (user && isPasswordCorrect) {
      const { password, ...result } = user;
      return result;
    }
  }

  async registerUser(dto: UserInputModel) {
    const findUser = await this.authRepository.getByLoginOrEmail(dto.login);

    if (findUser) {
      throw new BadRequestException([{ message: 'User already exist' }]);
    }

    const hashedPassword = await this.createHash(dto.password);

    const userDto = {
      login: dto.login,
      email: dto.email,
      password: hashedPassword,
      createdAt: new Date(),
      emailConfirmation: {
        confirmationCode: randomUUID(),
        expirationDate: add(new Date(), {
          hours: 1,
        }),
        isConfirmed: false,
      },
    };

    const user = await this.authRepository.registerUser(userDto);

    this.emailService.sendRegistrationEmail(
      userDto.email,
      userDto.emailConfirmation.confirmationCode,
    );

    return user;
  }

  async confirmRegistration(dto: RegistrationConfirmationCodeModel) {
    const findUser = await this.authRepository.getByConfirmationCode(dto.code);
    if (!findUser || findUser.emailConfirmation.isConfirmed === true) {
      throw new BadRequestException([
        {
          message:
            'Confirmation code is incorrect, expired or already been applied',
          field: 'code',
        },
      ]);
    }
    return await this.authRepository.updateConfirmation(findUser._id);
  }

  async loginUser(user: any) {
    console.log('User in loginUser', user);
    const payload = { login: user._doc.login, sub: user._doc._id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
