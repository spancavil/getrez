import { CreateChargeDto, NOTIFICATION_SERVICE } from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import Stripe from 'stripe';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';

@Injectable()
export class PaymentsService {
  //To get access to the .env variables
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    { apiVersion: '2024-04-10' },
  );

  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationsService: ClientProxy,
  ) {}

  async createCharge(createChargeDto: PaymentsCreateChargeDto) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method: createChargeDto.paymentMethod, //allowed payment methods for testing
      amount: createChargeDto.amount * 100, //to transform cents to dollar amount
      confirm: true,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
    });
    
    //use "emit" because is not Message Pattern, its an event pattern.
    this.notificationsService.emit('notify_email', {
      email: createChargeDto.email,
    });

    return paymentIntent;
  }
}
