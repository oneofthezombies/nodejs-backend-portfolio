import { NestFactory } from '@nestjs/core';
import { BrokerModule } from './broker.module';

async function bootstrap() {
  const app = await NestFactory.create(BrokerModule);
  await app.listen(3000);
}
bootstrap();
