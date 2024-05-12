import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { env } from '../env.js';
import { JwtPayload, ReqUser } from '../auth.types.js';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.JWT_KEY,
    });
  }

  async validate(payload: JwtPayload): Promise<ReqUser> {
    return {
      id: payload.sub,
      email: payload.username,
    };
  }
}
