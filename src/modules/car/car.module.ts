import { Module } from '@nestjs/common';
import { CarController } from './controllers/car.controller';
import { CarService } from './services/car.service';

@Module({
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}
