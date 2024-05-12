import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { BasicAuthGuard } from './basic/basic-auth.guard.js';
import { RegisterDto, ReqUser } from './auth.types.js';
import { ParseReqUser } from './auth.decorators.js';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return await this.authService.register(dto);
  }

  @UseGuards(BasicAuthGuard)
  @Post('login')
  async login(@ParseReqUser() reqUser: ReqUser) {
    return await this.authService.login(reqUser);
  }
}
