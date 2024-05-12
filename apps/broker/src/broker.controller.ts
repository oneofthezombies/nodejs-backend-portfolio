import { Controller, Get, UseGuards } from '@nestjs/common';
import { BrokerService } from './broker.service.js';
import { BasicAuthGuard } from '@libs/auth/basic/basic-auth.guard.js';

@Controller()
export class BrokerController {
  constructor(private readonly brokerService: BrokerService) {}

  @UseGuards(BasicAuthGuard)
  @Get()
  getHello(): string {
    return this.brokerService.getHello();
  }
}
