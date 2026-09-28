import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PaymentsModule } from './payments/payments.module.js';

@Module({
  imports: [

    // Carga las variables del archivo .env.
    ConfigModule.forRoot({

      // Hace que ConfigService pueda utilizarse en cualquier módulo
      // sin tener que importar ConfigModule nuevamente.
      isGlobal: true,

      // Verifica al iniciar la aplicación que estén
      // todas las variables de entorno necesarias.
      validate: (config) => {

        const requiredVariables = [
          'PORT',
          'STRIPE_SECRET',
          'STRIPE_SUCCESS_URL',
          'STRIPE_CANCEL_URL',
          'STRIPE_ENDPOINT_SECRET',
        ];

        // Recorremos las variables obligatorias.
        // Si falta alguna, detenemos el inicio de la aplicación.
        for (const variable of requiredVariables) {
          if (!config[variable]) {
            throw new Error(
              `Falta la variable de entorno: ${variable}`,
            );
          }
        }

        return config;
      },
    }),

    // Agrega a la aplicación todo nuestro módulo de pagos:
    // PaymentsController + PaymentsService.
    PaymentsModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}