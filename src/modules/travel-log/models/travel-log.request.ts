import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class TravelLogRequest {
  @ApiProperty({
    type: [Number],
    minLength: 2,
    maxLength: 2,
    example: [35.935959, 139.772994],
  })
  @ArrayMaxSize(2)
  @ArrayMinSize(2)
  @IsArray()
  @IsNotEmpty()
  location: number[];

  @ApiProperty({
    type: String,
    example: '〒343-0041 Saitama, Koshigaya, Sengendainishi',
  })
  @IsOptional()
  address: string;
}

export class TravelLogSaveRequest {
  @ApiProperty({ type: [TravelLogRequest] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TravelLogRequest)
  @IsNotEmpty()
  request: TravelLogRequest[];
}
