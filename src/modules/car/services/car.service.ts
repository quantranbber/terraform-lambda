import { Logger } from '@core/decorators/logger.decorator';
import { logger } from '@core/logs/logger';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseCodeEnum } from '@src/constants/response-code.enum';
import { CarRepository, RentalRegistrationRepository } from '@src/repositories';

@Injectable()
export class CarService {
  constructor(
    private carRepository: CarRepository,
    private rentalRepository: RentalRegistrationRepository,
  ) {}

  @Logger()
  async listCars() {
    try {
      return this.carRepository.find();
    } catch (error) {
      logger.error('RENTAL-REGISTRATION SERVICE ERROR: ', error);
      if (error?.status) {
        throw error;
      }
      throw new HttpException(
        { errorCode: ResponseCodeEnum.CM0000 },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Logger()
  async findTravelsByCar(licenseNumber: string) {
    try {
      return this.rentalRepository.findByCar(licenseNumber);
    } catch (error) {
      logger.error('RENTAL-REGISTRATION SERVICE ERROR: ', error);
      if (error?.status) {
        throw error;
      }
      throw new HttpException(
        { errorCode: ResponseCodeEnum.CM0000 },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
