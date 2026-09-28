import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';

async function bootstrap() {

  // Crea e inicia la aplicación Nest usando AppModule como módulo principal.
  // rawBody guarda el cuerpo ORIGINAL de las peticiones.
  // Lo necesitamos para verificar la firma de los webhooks de Stripe.
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });

  // Valida globalmente los datos que llegan a la API usando los DTO.
  app.useGlobalPipes(
    new ValidationPipe({

      // Solo permite las propiedades definidas en el DTO.
      whitelist: true,

      // Si mandan una propiedad que no existe en el DTO, devuelve error 400.
      forbidNonWhitelisted: true,
    }),
  );

  // Levanta el servidor en el puerto definido en .env.
  // Si PORT no existiera, intentaría usar el puerto 3000.
  await app.listen(process.env.PORT ?? 3000);
}

// Ejecuta la función que inicia nuestra aplicación.
bootstrap();