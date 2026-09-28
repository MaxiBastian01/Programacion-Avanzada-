import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller.js';
import { PaymentsService } from './payments.service.js';

@Module({

  // Controller que recibe las peticiones HTTP relacionadas con pagos.
  controllers: [PaymentsController],

  // Service que contiene la lógica de pagos y se comunica con Stripe.
  providers: [PaymentsService],

})
export class PaymentsModule {}