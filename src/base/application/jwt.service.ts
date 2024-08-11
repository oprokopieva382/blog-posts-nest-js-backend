import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(payload: any, secret: string, expiresIn: string) {
    return this.jwtService.sign(payload, { secret, expiresIn });
  }

  verifyToken(token: string, secret: string) {
    return this.jwtService.verify(token, { secret });
  }
}
