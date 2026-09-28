//Herramientas/Paquete de validación para los DTOs
import {
  IsString,
  IsNumber,
  IsPositive,
  IsArray,
  ArrayMinSize,
  ValidateNested
} from 'class-validator';

import { Type } from 'class-transformer';


// DTO de cada producto individual
export class PaymentItemDto {

  @IsString()
  name: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  quantity: number;
}


// DTO de la petición completa
export class CreatePaymentSessionDto {

  @IsString()
  orderId: string;

  @IsString()
  currency: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => PaymentItemDto)
  items: PaymentItemDto[];
}