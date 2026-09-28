import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreatePaymentSessionDto } from './dto/create-payment-session.dto.js';

@Injectable()
export class PaymentsService {

    private stripe: Stripe;

    constructor(private readonly configService: ConfigService) {
        const secret = this.configService.get<string>('STRIPE_SECRET');

        this.stripe = new Stripe(secret!);
    }

    async createPaymentSession(dto: CreatePaymentSessionDto) {

        const session = await this.stripe.checkout.sessions.create({
            mode: 'payment',

            line_items: dto.items.map((item) => ({
                price_data: {
                    currency: dto.currency,
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: Math.round(item.price * 100),
                },
                quantity: item.quantity,
            })),

            payment_intent_data: {
                metadata: {
                    orderId: dto.orderId,
                },
            },

            success_url: this.configService.get<string>('STRIPE_SUCCESS_URL')!,
            cancel_url: this.configService.get<string>('STRIPE_CANCEL_URL')!,
        });

        return {
            id: session.id,
            url: session.url,
        };
    }


    handleWebhook(
        rawBody: Buffer,
        signature: string,
    ) {
        const endpointSecret =
            this.configService.get<string>('STRIPE_ENDPOINT_SECRET')!;

        let event: Stripe.Event;

        try {
            event = this.stripe.webhooks.constructEvent(
                rawBody,
                signature,
                endpointSecret,
            );
        } catch (error) {
            throw new BadRequestException(
                'Firma del webhook inválida',
            );
        }
        if (event.type === 'charge.succeeded') {
            const charge = event.data.object as Stripe.Charge;

            const orderId = charge.metadata.orderId;

            console.log('Pago exitoso');
            console.log('Order ID:', orderId);
        } else {
            console.log('Evento no manejado:', event.type);
        }

        return { received: true };

    }
}
