import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { randomUUID } from 'crypto';
import { ConfigService } from '@nestjs/config';
import {
  CreateSessionCommand,
  CreateSessionUseCase,
} from './createSession-use-case';
import { TokenService } from 'src/base/application/jwt.service';

export class LoginUserCommand {
  constructor(
    public user: any,
    public ip: string,
    public headers: string,
  ) {}
}

@CommandHandler(LoginUserCommand)
export class LoginUserUseCase implements ICommandHandler<LoginUserCommand> {
  private readonly accessTokenSecret: string;
  private readonly refreshTokenSecret: string;
  constructor(
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
    private readonly createSessionUseCase: CreateSessionUseCase,
  ) {
    this.accessTokenSecret = this.configService.get<string>(
      'JWT_ACCESS_TOKEN_SECRET',
    );
    this.refreshTokenSecret = this.configService.get<string>(
      'JWT_REFRESH_TOKEN_SECRET',
    );
  }

  async execute(command: LoginUserCommand) {
    const deviceId = randomUUID();
    const IP = command.ip;
    const deviceName = command.headers['user-agent'] || 'Unknown Device';

    const payloadAT = { login: command.user.login, sub: command.user._id };
    const payloadRT = {
      login: command.user.login,
      sub: command.user._id,
      deviceId,
    };

    const accessToken = this.tokenService.generateToken(
      payloadAT,
      this.accessTokenSecret,
      '5m',
    );

    const refreshToken = this.tokenService.generateToken(
      payloadRT,
      this.refreshTokenSecret,
      '20m',
    );

    const { iat, exp } = await this.tokenService.verifyToken(refreshToken, this.refreshTokenSecret);

    await this.createSessionUseCase.execute(
      new CreateSessionCommand({
        userId: command.user._id,
        deviceId,
        iat: iat.toString(),
        deviceName,
        ip: IP,
        exp: exp.toString(),
      }),
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
