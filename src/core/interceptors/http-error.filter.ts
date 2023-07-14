import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { getMessage } from '@src/constants/response-code.enum';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();

    response.status(status).json({
      errorCode: exceptionResponse?.errorCode,
      message:
        exceptionResponse?.message ||
        exceptionResponse?.error ||
        getMessage(exceptionResponse?.errorCode),
    });
  }
}
