import { Body, Controller, Post, Get, Headers, Req } from '@nestjs/common';
import { CreatePaymentSessionDto } from './dto/create-payment-session.dto.js';
import { PaymentsService } from './payments.service.js';

// Todos los endpoints de este controller empiezan con /payments.
@Controller('payments')
export class PaymentsController {

  // Nest inyecta PaymentsService para que el Controller
  // pueda utilizar la lógica de pagos.
  constructor(private readonly paymentsService: PaymentsService) {}

  // POST /payments/create-payment-session
  // Recibe los datos del pago enviados en el body.
  @Post('create-payment-session')
  async createPaymentSession(
    @Body() dto: CreatePaymentSessionDto,
  ): Promise<{ id: string; url: string | null }> {

    // Le pasamos los datos al Service,
    // que se encargará de crear la sesión en Stripe.
    return this.paymentsService.createPaymentSession(dto);
  }

  // GET /payments/success
  // Stripe redirige acá al usuario si finaliza el pago.
  @Get('success')
  paymentSuccess() {
    return {
      ok: true,
      message: 'Payment successful',
    };
  }

  // GET /payments/cancel
  // Stripe redirige acá si el usuario cancela el pago.
  @Get('cancel')
  paymentCancel() {
    return {
      ok: false,
      message: 'Payment cancelled',
    };
  }

  // POST /payments/webhook
  // Stripe envía acá las notificaciones de eventos.
  @Post('webhook')
  webhook(
    // Obtenemos la petición para acceder al rawBody original.
    @Req() req: any,

    // Obtenemos la firma que Stripe manda en el header.
    @Headers('stripe-signature') signature: string,
  ) {

    // Enviamos el cuerpo original y la firma al Service,
    // donde se verifica que el webhook realmente venga de Stripe.
    return this.paymentsService.handleWebhook(
      req.rawBody,
      signature,
    );
  }
}