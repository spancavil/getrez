import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateChargeDto } from '@app/common';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern('create_charge')
  @UsePipes(new ValidationPipe()) //this will validate the incoming data with the expected payload
  async createCharge(@Payload() data: CreateChargeDto) {
    return this.paymentsService.createCharge(data)
  }
}
