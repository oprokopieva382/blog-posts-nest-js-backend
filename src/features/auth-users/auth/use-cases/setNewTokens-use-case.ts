import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TokenService } from 'src/base/application/jwt.service';
import { ConfigService } from '@nestjs/config';
import { UpdateSessionCommand, UpdateSessionUseCase } from './updateSession-use-case';

export class SetNewTokensCommand {
  constructor(
    public userId: string,
    public deviceId: string,
  ) {}
}

@CommandHandler(SetNewTokensCommand)
export class SetNewTokensUseCase
  implements ICommandHandler<SetNewTokensCommand>
{
  private readonly accessTokenSecret: string;
  private readonly refreshTokenSecret: string;
  constructor(
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
    private readonly updateSessionUseCase: UpdateSessionUseCase,
  ) {
    this.accessTokenSecret = this.configService.get<string>(
      'JWT_ACCESS_TOKEN_SECRET',
    );
    this.refreshTokenSecret = this.configService.get<string>(
      'JWT_REFRESH_TOKEN_SECRET',
    );
  }

  async execute(command: SetNewTokensCommand) {
    const payloadAT = { sub: command.userId };
    const payloadRT = {
      sub: command.userId,
      deviceId: command.deviceId,
    };

    const accessToken = this.tokenService.generateToken(
      payloadAT,
      this.accessTokenSecret,
      //'10m',
      '10s',
    );

    const refreshToken = this.tokenService.generateToken(
      payloadRT,
      this.refreshTokenSecret,
      //'20m',
      '20s',
    );

    await this.updateSessionUseCase.execute(
      new UpdateSessionCommand({
        refreshToken,
      }),
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
