import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino'
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  app.use(cookieParser()) //For parsing incoming cookies. If this is not present, cookies will be not recognized.
  app.useGlobalPipes(new ValidationPipe({ whitelist: true})) //With the "whitelist", all the properties that are not validated throught decorators won't be considered.
  app.useLogger(app.get(Logger))

  //With get we will retrieve any injectable. So now instead of hardcoding PORT we call an env variabel
  const configService = app.get(ConfigService)
  const port = configService.get('PORT')
  await app.listen(port);
}
bootstrap();
