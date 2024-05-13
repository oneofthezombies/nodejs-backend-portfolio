import { Injectable } from '@nestjs/common';
import { UserService } from './user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload, ReqUser } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: { email: string; password: string }): Promise<ReqUser> {
    const { password, ...paramWithoutPassword } = data;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const user = await this.userService.create({
      ...paramWithoutPassword,
      passwordHash,
    });
    return {
      id: user.id,
      email: user.email,
    };
  }

  async validateEmailPassword(data: {
    email: string;
    password: string;
  }): Promise<ReqUser | null> {
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

  async login(reqUser: ReqUser) {
    const payload = this.reqUserToJwtPayload(reqUser);
    const token = await this.jwtService.signAsync(payload);
    return {
      token,
    };
  }

  reqUserToJwtPayload(reqUser: ReqUser): JwtPayload {
    return {
      sub: reqUser.id,
      username: reqUser.email,
    };
  }

  jwtPayloadToReqUser(payload: JwtPayload): ReqUser {
    return {
      id: payload.sub,
      email: payload.username,
    };
  }
}
