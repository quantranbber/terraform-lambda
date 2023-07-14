import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from '@core/models/base.response';
import { Expose } from 'class-transformer';

class Location {
  @ApiProperty({ type: String, example: 'Point' })
  type: string;

  @ApiProperty({ type: [Number], example: [21.037110464, 105.757850464] })
  coordinates: number[];
}

export class Travel {
  @ApiProperty({ type: Number })
  @Expose()
  id: number;

  @ApiProperty({ type: Location })
  @Expose()
  location: Location;

  @ApiProperty({
    type: String,
    example: '〒343-0041 Saitama, Koshigaya, Sengendainishi',
  })
  @Expose()
  address: string;

  @ApiProperty({ type: Date })
  @Expose()
  createdAt: Date;
}

export class TravelsDistanceResponse {
  @ApiProperty({ type: [Travel] })
  travels: Travel[];

  @ApiProperty({ type: Number, example: 1000 })
  distance: number;

  @ApiProperty({ type: Date })
  startAt: Date;

  @ApiProperty({ type: Date })
  endAt: Date;
}

export class TravelsApiResponse extends BaseResponse {
  @ApiProperty({ type: TravelsDistanceResponse })
  data: TravelsDistanceResponse;
}
