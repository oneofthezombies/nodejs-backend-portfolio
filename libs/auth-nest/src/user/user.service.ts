import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findByEmail(data: { email: string }): Promise<User | null> {
    return this.prismaService.user.findUnique({ where: data });
  }

  async create(data: { email: string; passwordHash: string }): Promise<User> {
    return this.prismaService.user.create({
      data,
    });
  }
}
