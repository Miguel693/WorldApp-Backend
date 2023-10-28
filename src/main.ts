import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //! Habilita el cors
  app.enableCors();

  //* Este pipe valida que el email no este registrado
  app.useGlobalPipes(
    new ValidationPipe  ({
    whitelist: true,
    forbidNonWhitelisted: true,
    })
   );


  await app.listen(3000);
}
bootstrap();
