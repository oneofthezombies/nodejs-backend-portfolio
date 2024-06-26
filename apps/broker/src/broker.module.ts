import { Module } from '@nestjs/common';
import { BrokerController } from './broker.controller';
import { BrokerService } from './broker.service';
import { AuthModule } from '@libs/auth-nest';

@Module({
  imports: [AuthModule],
  controllers: [BrokerController],
  providers: [BrokerService],
})
export class BrokerModule {}
