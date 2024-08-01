import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { randomUUID } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

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

  async execute(command: LoginUserCommand) {
    const payload = { login: command.user.login, sub: command.user._id };

    //later for sessions
    const deviceId = randomUUID();
    const IP = command.ip;
    const deviceName = command.headers['user-agent'] || 'Unknown Device';

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
