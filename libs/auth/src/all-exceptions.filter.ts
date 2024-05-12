import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      statusCode !== HttpStatus.INTERNAL_SERVER_ERROR &&
      exception instanceof Error
        ? exception.message
        : 'Internal Server Error';
    const timestamp = new Date().toISOString();
    const path = httpAdapter.getRequestUrl(ctx.getRequest());
    const body = {
      statusCode,
      timestamp,
      path,
      message,
    };

    httpAdapter.reply(ctx.getResponse(), body, statusCode);

    if (statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      // TODO: logger
      console.error('Internal server error occurred.');
      console.error('path:', path);
      console.error('timestamp:', timestamp);
      console.error('message:', message);
      console.error('exception:', exception);
    }
  }
}
