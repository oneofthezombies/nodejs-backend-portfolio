import { Injectable } from '@nestjs/common';

@Injectable()
export class BrokerService {
  getHello(): string {
    return 'Hello World!';
  }
}
