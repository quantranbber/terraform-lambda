import { CustomRepository } from '@core/decorators/repository-custom.decorator';
import { Repository } from 'typeorm';
import { CarEntity } from '@entities/car.entity';

@CustomRepository(CarEntity)
export class CarRepository extends Repository<CarEntity> {}
