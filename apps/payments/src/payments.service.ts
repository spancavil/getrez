import { CreateChargeDto } from '@app/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  //To get access to the .env variables
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    { apiVersion: '2024-04-10' },
  );

  constructor(private readonly configService: ConfigService) {}

  async createCharge(createChargeDto: CreateChargeDto) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method: createChargeDto.paymentMethod, //allowed payment methods for testing
      amount: createChargeDto.amount * 100, //to transform cents to dollar amount
      confirm: true,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never'
      },
    });

    return paymentIntent;
  }
}
