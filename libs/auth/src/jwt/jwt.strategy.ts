import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from './jwt.types';
import { UserPayload } from '../auth.types';
import { env } from '../env';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.JWT_KEY,
    });
  }

  async validate(payload: JwtPayload): Promise<UserPayload> {
    return {
      id: payload.sub,
      email: payload.username,
    };
  }
}