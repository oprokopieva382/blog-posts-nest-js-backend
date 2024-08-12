import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { TokenService } from 'src/base/application/jwt.service';
import { AuthRepository } from '../auth.repository';
import { fromUnixTime } from 'date-fns/fromUnixTime';

@Injectable()
export class IsAuthRefreshTokenGuard implements CanActivate {
  private readonly refreshTokenSecret: string;
  constructor(
    private readonly tokenService: TokenService,
    private readonly authRepository: AuthRepository,
    private readonly configService: ConfigService,
  ) {
    this.refreshTokenSecret = this.configService.get<string>(
      'JWT_REFRESH_TOKEN_SECRET',
    );
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const refreshToken = request.cookies.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    const token = await this.tokenService.verifyToken(
      refreshToken,
      this.refreshTokenSecret,
    );
    console.log('token', token);

    if (!token.sub) {
      throw new UnauthorizedException();
    }

    const currentSession = await this.authRepository.getSessionByDeviceId(
      token.deviceId,
    );
    console.log('currentSession', currentSession);

    if (!currentSession) {
      throw new UnauthorizedException();
    }

    if (currentSession.iat !== fromUnixTime(token.iat).toISOString()) {
      throw new UnauthorizedException();
    }

    if (typeof refreshToken !== 'string') {
      throw new UnauthorizedException();
    }

     request.userId = token.sub;
     request.deviceId = token.deviceId;

    return true;
  }
}
