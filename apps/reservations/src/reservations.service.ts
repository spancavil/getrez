import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { PAYMENT_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationRepository: ReservationsRepository,
    @Inject(PAYMENT_SERVICE) private readonly paymentsService: ClientProxy,
  ) {}

  async create(createReservationDto: CreateReservationDto, userId: string) {
    return this.paymentsService
      .send('create_charge', createReservationDto.charge)
      .pipe(
        map(async (responseStripe) => {
          const reservation = await this.reservationRepository.create({
            ...createReservationDto,
            invoiceId: responseStripe.id,
            timestamp: new Date(),
            userId,
          });
          return reservation;
        }),
      );
  }

  async findAll() {
    return await this.reservationRepository.find({});
  }

  async findOne(id: string) {
    return await this.reservationRepository.findOne({ _id: id });
  }

  async update(id: string, updateReservationDto: UpdateReservationDto) {
    return await this.reservationRepository.findOneAndUpdate(
      { _id: id },
      { $set: updateReservationDto },
    );
  }

  async remove(id: string) {
    return await this.reservationRepository.findOneAndDelete({ _id: id });
  }
}
