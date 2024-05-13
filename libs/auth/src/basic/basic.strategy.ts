import { BasicStrategy as Strategy } from 'passport-http';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ReqUser } from '../auth.types';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<ReqUser> {
    const reqUser = await this.authService.validateEmailPassword({
      email,
      password,
    });
    if (!reqUser) {
      throw new UnauthorizedException();
    }
    return reqUser;
  }
}
