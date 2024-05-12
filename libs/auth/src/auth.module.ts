import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { UserModule } from './user/user.module.js';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy.js';
import { env } from './env.js';
import { BasicStrategy } from './basic/basic.strategy.js';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: env.JWT_KEY,
      signOptions: { expiresIn: '60s' },
    }),
    PrismaModule,
    UserModule,
  ],
  providers: [AuthService, BasicStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
