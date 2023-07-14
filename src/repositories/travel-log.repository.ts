import { CustomRepository } from '@core/decorators/repository-custom.decorator';
import { TravelLogEntity } from '@entities/travel-log.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { Travel } from '@modules/rental-registration/models/travels.response';

@CustomRepository(TravelLogEntity)
export class TravelLogRepository extends Repository<TravelLogEntity> {
  async findTravels(id: number) {
    const data = await this.createQueryBuilder()
      .where(`registration_id = :id`, { id })
      .orderBy('created_at', 'ASC')
      .getMany();

    return plainToInstance(Travel, data, {
      excludeExtraneousValues: true,
    });
  }

  async clearById(id: number) {
    return this.delete({ registrationId: id });
  }

  async findLatestPoint(id: number) {
    return this.createQueryBuilder()
      .where(`registration_id = :id`, { id })
      .orderBy('created_at', 'DESC')
      .limit(1)
      .getOne();
  }
}
