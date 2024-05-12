import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  UserCreateParam,
  UserCreateResult,
  UserFindByUsernameParam,
  UserFindByUsernameResult,
} from './user.types';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findUserByUsername(
    param: UserFindByUsernameParam,
  ): Promise<UserFindByUsernameResult> {
    return this.prismaService.user.findUnique({ where: param });
  }

  async createUser(param: UserCreateParam): Promise<UserCreateResult> {
    return this.prismaService.user.create({ data: param });
  }
}
