import { Logger } from '@core/decorators/logger.decorator';
import { logger } from '@core/logs/logger';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RentalRegistrationRepository } from '@repositories/rental-registration.repository';
import { ResponseCodeEnum } from '@src/constants/response-code.enum';
import { RentalRequest } from '@modules/rental-registration/models/rental.request';
import { plainToClass } from 'class-transformer';
import { RentalRegistrationResponse } from '@modules/rental-registration/models/rental-registration.response';
import { CarRepository, TravelLogRepository } from '@src/repositories';
import { TravelsDistanceResponse } from '@modules/rental-registration/models/travels.response';

@Injectable()
export class RentalRegistrationService {
  constructor(
    private rentalRegistrationRepository: RentalRegistrationRepository,
    private logRepository: TravelLogRepository,
    private carRepository: CarRepository,
  ) {}

  @Logger()
  async register(request: RentalRequest) {
    try {
      // TODO: delete after
      const car = await this.carRepository.findOneBy({
        carLicenseNumber: request.licenseNumber,
      });
      if (!car) {
        const newCar = this.carRepository.create({
          carLicenseNumber: request.licenseNumber,
        });
        await this.carRepository.save(newCar);
      }
      const newRegistration = this.rentalRegistrationRepository.create({
        carLicenseNumber: request.licenseNumber,
        driver: request.driver,
      });
      const data = await this.rentalRegistrationRepository.save(
        newRegistration,
      );
      return plainToClass(RentalRegistrationResponse, data, {
        excludeExtraneousValues: true,
      });
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
  async end(id: number) {
    try {
      logger.info(`----------end travel id ${id}-----------------`);
      const registration = await this.rentalRegistrationRepository.findById(id);
      if (!registration) {
        throw new HttpException(
          { errorCode: ResponseCodeEnum.CM0001 },
          HttpStatus.BAD_REQUEST,
        );
      }
      registration.endAt = new Date();

      await this.rentalRegistrationRepository.save(registration);
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
  async showTravels(id: number) {
    try {
      const registration = await this.rentalRegistrationRepository.findById(id);
      if (!registration) {
        throw new HttpException(
          { errorCode: ResponseCodeEnum.CM0001 },
          HttpStatus.BAD_REQUEST,
        );
      }

      const travels = await this.logRepository.findTravels(id);

      return {
        travels,
        distance: registration.totalDistance,
        startAt: registration.createdAt,
        endAt: registration.endAt,
      } as TravelsDistanceResponse;
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
