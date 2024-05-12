import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { BrokerModule } from './broker.module.js';
import { AllExceptionsFilter } from '@libs/auth/all-exceptions.filter.js';

async function bootstrap() {
  const app = await NestFactory.create(BrokerModule);
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
  await app.listen(3000);
}
bootstrap();
