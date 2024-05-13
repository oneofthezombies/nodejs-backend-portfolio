import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BasicAuthGuard } from './basic/basic-auth.guard';
import { RegisterDto, ReqUser } from './auth.types';
import { ParseReqUser } from './auth.decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
