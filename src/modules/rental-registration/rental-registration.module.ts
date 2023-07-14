import { Module } from '@nestjs/common';
import { RentalController } from './controllers/rental.controller';
import { RentalRegistrationService } from './services/rental-registration.service';
import { CommonService } from '@core/services/common.service';

@Module({
  controllers: [RentalController],
  providers: [RentalRegistrationService, CommonService],
})
export class RentalRegistrationModule {}
