import { Inject, Injectable } from '@nestjs/common';
import { UserService } from './user/user.service.js';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserPayload } from './auth.types.js';
import { JwtPayload } from './jwt/jwt.types.js';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
    @Inject(JwtService)
    private readonly jwtService: JwtService,
  ) {}

  async validateEmailPassword(data: {
    email: string;
    password: string;
  }): Promise<UserPayload | null> {
    const { password, ...paramWithoutPassword } = data;
    const user = await this.userService.findByEmail(paramWithoutPassword);
    if (!user) {
      return null;
    }
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return null;
    }
    return {
      id: user.id,
      email: user.email,
    };
  }

  async login(user: UserPayload) {
    const payload: JwtPayload = {
      sub: user.id,
      username: user.email,
    };
    const token = await this.jwtService.signAsync(payload);
    return {
      token,
    };
  }
}
