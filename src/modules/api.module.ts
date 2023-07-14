import { Module } from '@nestjs/common';
import { RentalRegistrationModule } from './rental-registration/rental-registration.module';
import { TravelLogModule } from '@modules/travel-log/travel-log.module';
import { CarModule } from '@modules/car/car.module';
@Module({
  imports: [RentalRegistrationModule, TravelLogModule, CarModule],
})
export class ApiModule {}
