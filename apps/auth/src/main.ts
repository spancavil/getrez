import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  //Connect to TCP microservice (apart from http external request)
  const configService = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configService.get('TCP_PORT'),
    }, //binds to all interfaces on the host. So now can listen to the incoming requests, to the specified port
  });
  app.use(cookieParser()); //For parsing incoming cookies. If this is not present, cookies will be not recognized.
  app.useGlobalPipes(new ValidationPipe({ whitelist: true })); //With the "whitelist", all the properties that are not validated throught decorators won't be considered.
  app.useLogger(app.get(Logger));

  //With get we will retrieve any injectable. So now instead of hardcoding PORT we call an env variable
  const httpPort = configService.get('HTTP_PORT');
  await app.startAllMicroservices();
  await app.listen(httpPort);
}
bootstrap();
