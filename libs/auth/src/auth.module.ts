import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [PrismaModule, UserModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
