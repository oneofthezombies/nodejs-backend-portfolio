import { Test, TestingModule } from '@nestjs/testing';
import { BrokerController } from './broker.controller';
import { BrokerService } from './broker.service';

describe('BrokerController', () => {
  let brokerController: BrokerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BrokerController],
      providers: [BrokerService],
    }).compile();

    brokerController = app.get<BrokerController>(BrokerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(brokerController.getHello()).toBe('Hello World!');
    });
  });
});
