import moment, { Moment } from 'moment-timezone';
import { constants } from '@src/constants/constants';

export const commonUtils = {
  parseDate(date: string): Moment {
    return moment.tz(date, constants.DATE_FORMAT_DASH, process.env.TIMEZONE);
  },
};
