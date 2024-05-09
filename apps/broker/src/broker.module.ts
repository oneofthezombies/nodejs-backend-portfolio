import { Module } from '@nestjs/common';
import { BrokerController } from './broker.controller';
import { BrokerService } from './broker.service';

@Module({
  imports: [],
  controllers: [BrokerController],
  providers: [BrokerService],
})
export class BrokerModule {}
