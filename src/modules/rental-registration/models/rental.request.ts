import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RentalRequest {
  @ApiProperty({ type: String, example: '29A1-12345' })
  @IsNotEmpty()
  licenseNumber: string;

  @ApiProperty({ type: String, example: 'Yamcha' })
  @IsNotEmpty()
  driver: string;
}
