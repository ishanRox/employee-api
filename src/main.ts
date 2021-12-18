import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import path, { join } from 'path/posix';

async function bootstrap() {
  const port: string = process.env.PORT;
  const app = await NestFactory.create(AppModule);
  app.use('/public', express.static(join(__dirname, '..', '/upload')));
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
  }));
  Logger.log(`Server started running on http://localhost:${port}`, 'Bootstrap');
  await app.listen(port);
}

bootstrap();
