import { Controller, Get } from '@nestjs/common';
import { BrokerService } from './broker.service.js';

@Controller()
export class BrokerController {
  constructor(private readonly brokerService: BrokerService) {}

  @Get()
  getHello(): string {
    return this.brokerService.getHello();
  }
}
