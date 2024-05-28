import { CreateChargeDto } from '@app/common';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';

export class CreateReservationDto {
  //Add class validator as decorators
  @IsDate()
  @Type(() => Date) //Will transform the date, ie "12-05-1989" into a valid date
  startDate: Date;
  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateChargeDto)
  charge: CreateChargeDto;
}
