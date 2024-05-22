import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino'

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true})) //With the "whitelist", all the properties that are not validated throught decorators won't be considered.
  app.useLogger(app.get(Logger))
  await app.listen(3000);
}
bootstrap();
