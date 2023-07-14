import { logger } from '@core/logs/logger';

export enum ResponseCodeEnum {
  /**
   * Internal server error
   */
  CM0000 = 'CM0000',
  CM0001 = 'CM0001',
  CM0002 = 'CM0002',
}

const RESPONSE_CODE_MESSAGE_MAP: { [key in ResponseCodeEnum]: string } = {
  [ResponseCodeEnum.CM0000]:
    'エラーが発生いたしました。もう一度お試しください。',
  [ResponseCodeEnum.CM0001]: 'Registration not found',
  [ResponseCodeEnum.CM0002]: 'Id can not empty',
};

export const getMessage = (responseCode: ResponseCodeEnum): string => {
  if (RESPONSE_CODE_MESSAGE_MAP[responseCode]) {
    return RESPONSE_CODE_MESSAGE_MAP[responseCode];
  } else {
    logger.error('Response code not found in dictionary', responseCode);
    return null;
  }
};
