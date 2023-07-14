import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseResponse } from '@core/models/base.response';

export class RentalRegistrationResponse {
  @ApiProperty({ type: Number, example: 1 })
  @Expose()
  id: number;

  @ApiProperty({ type: String, example: 'Yamcha' })
  @Expose()
  driver: string;

  @ApiProperty({ type: String, example: '29A1-12345' })
  @Expose()
  carLicenseNumber: string;
}

export class RentalRegistrationApiResponse extends BaseResponse {
  @ApiProperty({ type: RentalRegistrationResponse })
  data: RentalRegistrationResponse;
}
