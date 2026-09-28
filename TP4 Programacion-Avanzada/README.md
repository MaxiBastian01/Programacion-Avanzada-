# TP4 - Sesiones de pago y Webhook con Stripe

Microservicio desarrollado con NestJS para crear sesiones de pago mediante Stripe Checkout y recibir notificaciones de pagos mediante webhooks.

## Instalación

```bash
npm install
```

## Variables de entorno

Crear un archivo `.env` tomando como referencia `.env.template`:

```env
PORT=3003
STRIPE_SECRET=
STRIPE_SUCCESS_URL=http://localhost:3003/payments/success
STRIPE_CANCEL_URL=http://localhost:3003/payments/cancel
STRIPE_ENDPOINT_SECRET=
```

## Ejecutar el proyecto

```bash
npm run start:dev
```

El servidor se ejecuta en:

`http://localhost:3003`

## Crear una sesión de pago

Endpoint:

`POST /payments/create-payment-session`

Ejemplo:

```json
{
  "orderId": "ord-1",
  "currency": "usd",
  "items": [
    {
      "name": "Teclado",
      "price": 20,
      "quantity": 1
    }
  ]
}
```

La API devuelve el `id` y la `url` de la sesión de Stripe Checkout.

## Webhook

Para probar el webhook localmente con Stripe CLI:

```bash
stripe login
stripe listen --events charge.succeeded --forward-to localhost:3003/payments/webhook
```

Copiar el `whsec_...` generado por Stripe CLI en `STRIPE_ENDPOINT_SECRET` dentro del `.env` y reiniciar el servidor.

Cuando Stripe envía el evento `charge.succeeded`, el backend verifica la firma del webhook y obtiene el `orderId` almacenado en los metadatos del pago.

## Tarjeta de prueba

Número: `4242 4242 4242 4242`

Usar una fecha de vencimiento futura y cualquier CVC de tres dígitos.