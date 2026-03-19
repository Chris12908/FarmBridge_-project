import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptionsWithRequest } from 'passport-jwt';
import { Request } from 'express';
import {
  JwtRefreshPayload,
  JwtPayload,
} from '../../../common/types/jwt-payload.type';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private configService: ConfigService) {
    const options: StrategyOptionsWithRequest = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow<string>('jwt.refreshSecret'),
      passReqToCallback: true,
      ignoreExpiration: false,
    };
    super(options);
  }

  validate(req: Request, payload: JwtPayload): JwtRefreshPayload {
    const authHeader = req.headers.authorization;
    const refreshToken = authHeader?.split(' ')[1] ?? '';
    return {
      sub: payload.sub,
      email: payload.email,
      role: payload.role,
      refreshToken,
    };
  }
}
