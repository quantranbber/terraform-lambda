import { HttpResponse } from '@core/models/http.response';
import { Body, Controller, Param, Post, HttpStatus } from '@nestjs/common';
import { TravelLogService } from '../services/travel-log.service';
import { Public } from '@core/strategy/jwt-auth.guard';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TravelLogSaveRequest } from '@modules/travel-log/models/travel-log.request';
import { TravelsApiResponse } from '@modules/rental-registration/models/travels.response';
import { ValidateNumeric } from '@core/decorators/id-validation.pipe';

@ApiTags('travel-log')
@Controller('travel-log')
export class TravelLogController {
  constructor(private logService: TravelLogService) {}

  @Public()
  @Post('/:id/save')
  @ApiBody({
    description: 'save location request',
    type: TravelLogSaveRequest,
  })
  @ApiParam({
    name: 'id',
    description: 'registration id',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'success',
    type: TravelsApiResponse,
  })
  async register(
    @Param('id', ValidateNumeric) id: number,
    @Body() request: TravelLogSaveRequest,
  ) {
    const response = await this.logService.save(id, request);
    return new HttpResponse(response).build();
  }
}
