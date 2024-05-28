import {
  IsCreditCard,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import Stripe from 'stripe';

export class CardDto {
  @IsString()
  @IsNotEmpty()
  cvc: string;
  
  @IsString()
  @IsNotEmpty()
  exp_month: number;

  @IsNumber()
  exp_year: number;

  @IsString()
  @IsOptional()
  networks?: Stripe.PaymentMethodCreateParams.Card1.Networks;

  @IsCreditCard()
  number: string;
}
