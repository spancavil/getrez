import { Prop } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { IsDate, IsString, IsNotEmpty } from 'class-validator';

export class CreateReservationDto {
  //Add class validator as decorators
  @IsDate()
  @Type(() => Date) //Will transform the date, ie "12-05-1989" into a valid date
  startDate: Date;
  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @IsString()
  @IsNotEmpty()
  placeId: string;

  @IsString()
  @IsNotEmpty()
  invoiceId: string;
}
