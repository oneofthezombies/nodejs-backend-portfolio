import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { env } from './env';
import { BasicStrategy } from './basic/basic.strategy';
import { AuthController } from './auth.controller';
import { PrismaModule } from './prisma/prisma.module';

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
  controllers: [AuthController],
  providers: [AuthService, BasicStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
