import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BusinessException } from './business.exception';
@Catch(Error)
export class AllExceptions implements ExceptionFilter {
  private readonly domaine: string;
  private logger = new Logger(HttpException.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.status;
    let body;
    if (exception instanceof BusinessException)
      body = {
        domain: exception.domain,
        statusCode: exception.status,
        apiMessage: exception.apiMessage,
        timestamp: exception.timestamp.toString(),
      };
    else if (exception instanceof HttpException)
      body = exception['response'] || {
        domain: 'Generic',
        statusCode: status,
        apiMessage: exception.message,
        timestamp: new Date(),
      };
    else {
      body = new BusinessException(
        'Generic',
        `Internal error occured ${exception.message}`,
        'Internal error occured',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    this.logger.error({
      ...body,
      message: exception.message,
      path: request.url,
      method: request.method,
    });

    response.status(status).json({
      ...body,
    });
  }
}
