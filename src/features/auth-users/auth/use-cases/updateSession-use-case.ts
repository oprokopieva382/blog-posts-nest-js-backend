import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthRepository } from '../auth.repository';
import { fromUnixTime } from 'date-fns/fromUnixTime';
import { TokenService } from 'src/base/application/jwt.service';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';

type SessionDataType = {
  refreshToken: string;
};

export class UpdateSessionCommand {
  constructor(public sessionData: SessionDataType) {}
}

@CommandHandler(UpdateSessionCommand)
export class UpdateSessionUseCase
  implements ICommandHandler<UpdateSessionCommand>
{
  private readonly refreshTokenSecret: string;
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {
    this.refreshTokenSecret = this.configService.get<string>(
      'JWT_REFRESH_TOKEN_SECRET',
    );
  }

  async execute(command: UpdateSessionCommand) {
    const { iat, exp, deviceId } = await this.tokenService.verifyToken(
      command.sessionData.refreshToken,
      this.refreshTokenSecret,
    );

    const tokenIat = fromUnixTime(+iat!);
    const dbIat = new Date(iat!);

    if (tokenIat > dbIat) {
      await this.authRepository.updateSession({
        iat: tokenIat.toISOString(),
        exp: fromUnixTime(+exp!).toISOString(),
        deviceId: deviceId,
      });
    } 
  }
}
