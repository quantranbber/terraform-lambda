import { BaseResponse } from '@core/models/base.response';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { Travel } from '@modules/rental-registration/models/travels.response';

class StartPoint extends Travel {
  @ApiProperty({ type: Number })
  @Expose({ name: 'registration_id' })
  registrationId: number;

  @ApiProperty({ type: Date })
  @Expose({ name: 'created_at' })
  createdAt: Date;
}

export class CarTravel {
  @Expose()
  @ApiProperty({ type: Number })
  id: number;

  @Expose({ name: 'car_license_number' })
  @ApiProperty({ type: String })
  carLicenseNumber: string;

  @Expose()
  @ApiProperty({ type: String })
  driver: string;

  @Expose({ name: 'total_distance' })
  @ApiProperty({ type: Number })
  totalDistance: number;

  @Expose({ name: 'created_at' })
  @ApiProperty({ type: Date })
  createdAt: Date;

  @Expose({ name: 'end_at' })
  @ApiProperty({ type: Date })
  endAt: Date;

  @ApiProperty({ type: StartPoint })
  @Expose({ name: 'start_point' })
  @Type(() => StartPoint)
  startPoint: StartPoint;

  @ApiProperty({ type: StartPoint })
  @Expose({ name: 'end_point' })
  @Type(() => StartPoint)
  endPoint: StartPoint;
}

export class CarTravelsResponse extends BaseResponse {
  @ApiProperty({ type: [CarTravel] })
  data: CarTravel[];
}
