import { Module } from '@nestjs/common';
import { BrokerController } from './broker.controller.js';
import { BrokerService } from './broker.service.js';
import { AuthModule } from '@libs/auth/auth.module.js';

@Module({
  imports: [AuthModule],
  controllers: [BrokerController],
  providers: [BrokerService],
})
export class BrokerModule {}
