import { Type } from 'class-transformer';
import { CardDto } from './card.dto';
import {
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateChargeDto {
  @IsNumber()
  amount: number;

  @IsString()
  @IsNotEmpty()
  paymentMethod: 'string';
}
