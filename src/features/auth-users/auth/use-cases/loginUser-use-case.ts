import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { randomUUID } from 'crypto';
import {
  CreateSessionCommand,
  CreateSessionUseCase,
} from './createSession-use-case';
import { TokenService } from 'src/base/application/jwt.service';
import { AppSettings } from 'src/settings/app-settings';
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
    private readonly tokenService: TokenService,
    private readonly createSessionUseCase: CreateSessionUseCase,
    private readonly configService: ConfigService,
    //private readonly appSettings: AppSettings,
  ) {
     this.accessTokenSecret = this.configService.get<string>(
       'JWT_ACCESS_TOKEN_SECRET',
     );
     this.refreshTokenSecret = this.configService.get<string>(
       'JWT_REFRESH_TOKEN_SECRET',
     );
  }

  async execute(command: LoginUserCommand) {
    //get token secrets value
    // const accessTokenSecret = this.appSettings.api.JWT_ACCESS_TOKEN_SECRET ?? "";
    // const refreshTokenSecret = this.appSettings.api.JWT_REFRESH_TOKEN_SECRET ?? "";
    // console.log('accessTokenSecret', accessTokenSecret);
    // console.log('refreshTokenSecret', refreshTokenSecret);

    //gen values for session
    const deviceId = randomUUID();
    const IP = command.ip;
    const deviceName = command.headers['user-agent'] || 'Unknown Device';

    //set tokens payload
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

    const { iat, exp } = await this.tokenService.verifyToken(
      refreshToken,
      this.refreshTokenSecret,
    );

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
