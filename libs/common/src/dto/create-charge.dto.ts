import {
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateChargeDto {
  @IsNumber()
  amount: number;

  @IsString()
  @IsNotEmpty()
  paymentMethod: 'string';
}
