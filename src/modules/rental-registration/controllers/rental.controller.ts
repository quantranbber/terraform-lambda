import { HttpResponse } from '@core/models/http.response';
import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Put,
  Get,
  Param,
} from '@nestjs/common';
import { RentalRegistrationService } from '../services/rental-registration.service';
import { Public } from '@core/strategy/jwt-auth.guard';
import { RentalRequest } from '@modules/rental-registration/models/rental.request';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RentalRegistrationApiResponse } from '@modules/rental-registration/models/rental-registration.response';
import { BaseResponse } from '@core/models/base.response';
import { TravelsApiResponse } from '@modules/rental-registration/models/travels.response';
import { ValidateNumeric } from '@core/decorators/id-validation.pipe';

@ApiTags('rental')
@Controller('rental')
export class RentalController {
  constructor(private registrationService: RentalRegistrationService) {}

  @Public()
  @Post('/register')
  @ApiBody({
    description: 'registration request',
    type: RentalRequest,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'success',
    type: RentalRegistrationApiResponse,
  })
  async register(@Body() request: RentalRequest) {
    const data = await this.registrationService.register(request);
    return new HttpResponse(data).build();
  }

  @Public()
  @Put('/:id/end')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
    type: BaseResponse,
  })
  async end(@Param('id', ValidateNumeric) id: number) {
    const data = await this.registrationService.end(id);
    return new HttpResponse(data).build();
  }

  @Public()
  @Get('/:id/show-travels')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
    type: TravelsApiResponse,
  })
  async showTravels(@Param('id', ValidateNumeric) id: number) {
    const data = await this.registrationService.showTravels(id);
    return new HttpResponse(data).build();
  }
}
