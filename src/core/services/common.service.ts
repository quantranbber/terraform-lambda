import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import moment from 'moment-timezone';
import { constants } from '@src/constants/constants';
import { Travel } from '@modules/rental-registration/models/travels.response';

@Injectable()
export class CommonService {
  private timezone: string;

  constructor(configService: ConfigService) {
    this.timezone = configService.get<string>('timezone');
  }

  dateTimeWithTimeZone() {
    return moment().tz(this.timezone).toDate();
  }

  parseDateAndFormat(date: string): string {
    return moment.tz(date, process.env.TIMEZONE).format(constants.DATE_FORMAT);
  }

  showDistance(logs: Travel[]) {
    let totalDistance = 0;
    for (let idx = 0; idx < logs.length - 1; idx++) {
      const currentLog = logs[idx];
      const nextLog = logs[idx + 1];
      const distance = this.calculateDistance(
        currentLog.location?.coordinates,
        nextLog.location?.coordinates,
      );
      totalDistance += distance;
    }

    return totalDistance;
  }

  private rad(x) {
    return (x * Math.PI) / 180;
  }

  private calculateDistance(location1: number[], location2: number[]) {
    const R = 6378137; // Earth’s mean radius in meter
    const dLat = this.rad(location2[0] - location1[0]);
    const dLong = this.rad(location2[1] - location1[1]);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.rad(location1[0])) *
        Math.cos(this.rad(location2[0])) *
        Math.sin(dLong / 2) *
        Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}
