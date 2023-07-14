import { Module } from '@nestjs/common';
import { TravelLogController } from './controllers/travel-log.controller';
import { TravelLogService } from './services/travel-log.service';
import { CommonService } from '@core/services/common.service';

@Module({
  controllers: [TravelLogController],
  providers: [TravelLogService, CommonService],
})
export class TravelLogModule {}
