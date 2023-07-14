import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ResponseCodeEnum } from '@src/constants/response-code.enum';

@Injectable()
export class ValidateNumeric implements PipeTransform<string> {
  transform(value: string): string {
    if (!parseInt(value?.toString())) {
      throw new HttpException(
        { errorCode: ResponseCodeEnum.CM0002 },
        HttpStatus.BAD_REQUEST,
      );
    }

    return value;
  }
}
