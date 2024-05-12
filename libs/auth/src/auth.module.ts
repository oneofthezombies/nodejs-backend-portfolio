import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { env } from './env';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: env.JWT_KEY,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
