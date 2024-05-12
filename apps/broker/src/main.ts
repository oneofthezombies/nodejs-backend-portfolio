import { NestFactory } from '@nestjs/core';
import { BrokerModule } from './broker.module.js';

async function bootstrap() {
  const app = await NestFactory.create(BrokerModule);
  await app.listen(3000);
}
bootstrap();
