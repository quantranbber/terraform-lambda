import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from '@core/models/base.response';

class Car {
  @ApiProperty({ type: String })
  carLicenseNumber: number;

  @ApiProperty({ type: Date })
  createdAt: Date;
}

export class CarResponse extends BaseResponse {
  @ApiProperty({ type: [Car] })
  data: Car[];
}
