import { Injectable } from '@nestjs/common';
import { UserService } from './user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserPayload } from './auth.types';
import { JwtPayload } from './jwt.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(data: {
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
