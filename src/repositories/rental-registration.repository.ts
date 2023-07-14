import { CustomRepository } from '@core/decorators/repository-custom.decorator';
import { RentalRegistrationEntity } from '@entities/rental-registration.entity';
import { Repository } from 'typeorm';
import { TravelLogEntity } from '@entities/travel-log.entity';
import { plainToInstance } from 'class-transformer';
import { CarTravel } from '@modules/car/models/travel.response';

@CustomRepository(RentalRegistrationEntity)
export class RentalRegistrationRepository extends Repository<RentalRegistrationEntity> {
  async findById(id: number) {
    return this.findOneBy({ id });
  }

  async findByCar(license: string) {
    const subQuery = this.manager
      .createQueryBuilder()
      .select([
        'JSONB_AGG(tl.*) -> 0 AS start_point',
        'JSONB_AGG(tl.*) -> -1 AS end_point',
        'tl.registration_id AS registration_id',
      ])
      .from(TravelLogEntity, 'tl')
      .groupBy('tl.registration_id');

    const rawData = await this.createQueryBuilder('rr')
      .select(['rr.*', 'tl.start_point', 'tl.end_point'])
      .leftJoin(`(${subQuery.getQuery()})`, 'tl', 'tl.registration_id = rr.id')
      .where('rr.car_license_number = :license', { license })
      .orderBy('rr.created_at', 'DESC')
      .getRawMany();

    return plainToInstance(CarTravel, rawData, {
      excludeExtraneousValues: true,
    });
  }
}
