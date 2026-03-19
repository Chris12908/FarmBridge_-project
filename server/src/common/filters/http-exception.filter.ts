import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtPayload } from '../types/jwt-payload.type';

interface ExceptionResponseObject {
  message?: string | string[];
  error?: string;
  statusCode?: number;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // ── Timing (stamped by LoggingInterceptor before next.handle()) ───────────
    const startTime = (request as unknown as Record<string, unknown>).__startTime;
    const ms = typeof startTime === 'number' ? `+${Date.now() - startTime}ms` : '';

    // ── User context ──────────────────────────────────────────────────────────
    const user = request.user as JwtPayload | undefined;
    const userStr = user ? ` [user: ${user.sub} ${user.role}]` : '';

    // ── Resolve status + response body ────────────────────────────────────────
    let status: number;
    let errorResponse: Record<string, unknown>;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      errorResponse = {
        statusCode: status,
        error: HttpStatus[status] ?? 'Error',
        message:
          typeof exceptionResponse === 'string'
            ? exceptionResponse
            : ((exceptionResponse as ExceptionResponseObject).message ??
              exception.message),
        details:
          typeof exceptionResponse !== 'string' &&
          Array.isArray((exceptionResponse as ExceptionResponseObject).message)
            ? (exceptionResponse as ExceptionResponseObject).message
            : undefined,
        path: request.url,
        timestamp: new Date().toISOString(),
      };
    } else {
      // Raw unhandled error — DB crash, Redis failure, etc.
      // Never leak the internal message to the client.
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorResponse = {
        statusCode: status,
        error: 'Internal Server Error',
        message: 'An unexpected error occurred',
        path: request.url,
        timestamp: new Date().toISOString(),
      };
    }

    // ── Logging ───────────────────────────────────────────────────────────────
    const prefix = `${request.method} ${request.url} ${status} ${ms}${userStr}`;

    if (status >= 500) {
      const stack =
        exception instanceof Error ? exception.stack : String(exception);
      this.logger.error(prefix, stack);
    } else {
      // 4xx — expected client errors, no stack noise
      this.logger.warn(prefix);
    }

    response.status(status).json(errorResponse);
  }
}
