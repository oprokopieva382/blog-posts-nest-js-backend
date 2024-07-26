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
import { NewPasswordRecoveryInputModel } from './DTOs/input/NewPasswordRecoveryInputModel.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly accessTokenSecret: string;
  private readonly refreshTokenSecret: string;

  constructor(
    private readonly authRepository: AuthRepository,
    private readonly emailService: EmailService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.accessTokenSecret = this.configService.get<string>(
      'JWT_ACCESS_TOKEN_SECRET',
    );
    this.refreshTokenSecret = this.configService.get<string>(
      'JWT_REFRESH_TOKEN_SECRET',
    );
  }

  async createHash(password: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async testPassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  async validateUser(data: string, password: string): Promise<any> {
    const user = await this.authRepository.getByLogin(data);
    if (!user) {
      throw new UnauthorizedException();
    }
    const isPasswordCorrect = await this.testPassword(password, user.password);

    if (user && isPasswordCorrect) {
      const { password, ...result } = user.toObject();
      return result;
    }
  }

  async registerUser(dto: UserInputModel) {
    const userL = await this.authRepository.getByLogin(dto.login);
    const userE = await this.authRepository.getByEmail(dto.email);

    if (userL) {
      throw new BadRequestException([
        { message: 'User already exist', field: 'login' },
      ]);
    }
    if (userE) {
      throw new BadRequestException([
        { message: 'User already exist', field: 'email' },
      ]);
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

  async confirmRegistration(code: string) {
    const findUser = await this.authRepository.getByConfirmationCode(code);
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

  async registrationEmailResending(email: string) {
    const findUser = await this.authRepository.getByEmail(email);

    if (!findUser) {
      throw new BadRequestException([
        {
          message: 'Incorrect input value',
          field: 'email',
        },
      ]);
    }

    const newCode = randomUUID();
    await this.authRepository.updateCode(findUser._id, newCode);

    this.emailService.sendRegistrationEmail(email, newCode);

    return findUser;
  }

  async passwordRecovery(email: string) {
    const passwordRecoveryCodeDto = {
      recoveryCode: randomUUID(),
      email,
      expirationDate: add(new Date(Date.now()).toISOString(), {
        hours: 1,
      }),
      createdAt: new Date().toISOString(),
    };

    const { recoveryCode } = await this.authRepository.savePasswordRecoveryInfo(
      passwordRecoveryCodeDto,
    );

    await this.emailService.sendPasswordRecoveryEmail(email, recoveryCode);
  }

  async setNewPassword(data: NewPasswordRecoveryInputModel) {
    const { newPassword, recoveryCode } = data;
    const result = await this.authRepository.getByRecoveryCode(recoveryCode);

    if (!result || new Date(result.expirationDate) < new Date()) {
      throw new BadRequestException();
    }
    const passwordHash = await this.createHash(newPassword);

    await this.authRepository.setNewPassword(result.email, passwordHash);
  }

  async loginUser(user: any, ip: string, headers: string) {
    const payload = { login: user.login, sub: user._id };

    //later for sessions
    const deviceId = randomUUID();
    const IP = ip;
    const deviceName = headers['user-agent'] || 'Unknown Device';

    const accessToken = this.jwtService.sign(payload, {
      secret: this.accessTokenSecret,
      expiresIn: '5m',
    });
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.refreshTokenSecret,
      expiresIn: '20m',
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
