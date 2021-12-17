import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port:string = process.env.PORT;
  const app = await NestFactory.create(AppModule);
  Logger.log(`Server started running on http://localhost:${port}`, 'Bootstrap');
  await app.listen(port);
}

bootstrap();
