import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    @Inject(PrismaService)
    private readonly prismaService: PrismaService,
  ) {}

  async findByEmail(data: { email: string }): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: data });
  }

  async create(data: { email: string; password: string }): Promise<User> {
    const { password, ...paramWithoutPassword } = data;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    return this.prismaService.user.create({
      data: {
        ...paramWithoutPassword,
        passwordHash,
      },
    });
  }
}
