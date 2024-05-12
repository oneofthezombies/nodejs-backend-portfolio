import { BasicStrategy as Strategy } from 'passport-http';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service.js';
import { ReqUser } from '../auth.types.js';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService,
  ) {
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
