import { Logger } from '@core/decorators/logger.decorator';
import { logger } from '@core/logs/logger';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseCodeEnum } from '@src/constants/response-code.enum';
import { TravelLogSaveRequest } from '@modules/travel-log/models/travel-log.request';
import {
  RentalRegistrationRepository,
  TravelLogRepository,
} from '@src/repositories';
import { CommonService } from '@core/services/common.service';
import { TravelsDistanceResponse } from '@modules/rental-registration/models/travels.response';
import { DataSource } from 'typeorm';

@Injectable()
export class TravelLogService {
  constructor(
    private dataSource: DataSource,
    private commonService: CommonService,
    private logRepository: TravelLogRepository,
    private registrationRepository: RentalRegistrationRepository,
  ) {}

  @Logger()
  async save(id: number, request: TravelLogSaveRequest) {
    try {
      const registration = await this.validateRegistrationId(id);
      const locations = [];
      const logs = [];
      request.request.forEach((el) => {
        const location = {
          type: 'Point',
          coordinates: el.location,
        } as any;
        const newLog = this.logRepository.create({
          location,
          address: el.address,
          registrationId: id,
        });

        locations.push(location);
        logs.push(newLog);
      });
      const totalDistance = this.commonService.showDistance(logs);
      registration.totalDistance = totalDistance;

      await this.dataSource.manager.transaction(async (em) => {
        const logRepo = em.withRepository(this.logRepository);
        const regisRepo = em.withRepository(this.registrationRepository);
        // clear data before save
        await logRepo.clearById(id);

        await Promise.all([logRepo.save(logs), regisRepo.save(registration)]);
      });

      return {
        travels: logs,
        distance: totalDistance,
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

  private async validateRegistrationId(id: number) {
    const registration = await this.registrationRepository.findById(id);
    if (!registration) {
      throw new HttpException(
        { errorCode: ResponseCodeEnum.CM0001 },
        HttpStatus.BAD_REQUEST,
      );
    }

    return registration;
  }
}
