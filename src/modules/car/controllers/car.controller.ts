import { HttpResponse } from '@core/models/http.response';
import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { CarService } from '../services/car.service';
import { Public } from '@core/strategy/jwt-auth.guard';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CarResponse } from '@modules/car/models/cars.response';
import { CarTravelsResponse } from '@modules/car/models/travel.response';

@ApiTags('cars')
@Controller('cars')
export class CarController {
  constructor(private carService: CarService) {}

  @Public()
  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
    type: CarResponse,
  })
  async listCars() {
    const cars = await this.carService.listCars();
    return new HttpResponse(cars).build();
  }

  @Public()
  @Get('/:licenseNumber/travels')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
    type: CarTravelsResponse,
  })
  async listTravels(@Param('licenseNumber') licenseNumber: string) {
    const cars = await this.carService.findTravelsByCar(licenseNumber);
    return new HttpResponse(cars).build();
  }
}
