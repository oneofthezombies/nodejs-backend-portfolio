import { Controller, Get, UseGuards } from '@nestjs/common';
import { BrokerService } from './broker.service';
import { BasicAuthGuard } from '@libs/auth-nest';

@Controller()
export class BrokerController {
  constructor(private readonly brokerService: BrokerService) {}

  @UseGuards(BasicAuthGuard)
  @Get()
  getHello(): string {
    return this.brokerService.getHello();
  }
}
