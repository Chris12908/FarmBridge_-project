import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { JwtPayload } from '../types/jwt-payload.type';

const SENSITIVE_KEYS = new Set([
  'password',
  'confirmPassword',
  'token',
  'refreshToken',
]);

function sanitizeBody(body: unknown): unknown {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return body;
  const sanitized = { ...(body as Record<string, unknown>) };
  for (const key of SENSITIVE_KEYS) {
    if (key in sanitized) sanitized[key] = '[REDACTED]';
  }
  return sanitized;
}

function colorStatus(status: number): string {
  if (status >= 500) return `\x1b[31m${status}\x1b[0m`; // red
  if (status >= 400) return `\x1b[33m${status}\x1b[0m`; // yellow
  return `\x1b[32m${status}\x1b[0m`; // green
}

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const { method, url, query, body } = request;
    const user = request.user as JwtPayload | undefined;
    const start = Date.now();

    // Stamp start time so the exception filter can compute timing for guard errors
    (request as unknown as Record<string, unknown>).__startTime = start;

    // ── Incoming request log ──────────────────────────────────────────────────
    const queryStr =
      Object.keys(query ?? {}).length
        ? ` [query: ${JSON.stringify(query)}]`
        : '';
    const bodyStr =
      body && Object.keys(body as Record<string, unknown>).length
        ? ` [body: ${JSON.stringify(sanitizeBody(body))}]`
        : '';
    const userStr = user ? ` [user: ${user.sub} ${user.role}]` : '';
    this.logger.log(`→ ${method} ${url}${queryStr}${bodyStr}${userStr}`);

    // ── Outgoing response log ─────────────────────────────────────────────────
    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse<Response>();
        const ms = Date.now() - start;
        this.logger.log(
          `← ${method} ${url} ${colorStatus(response.statusCode)} +${ms}ms`,
        );
      }),
      catchError((err: unknown) => {
        // Errors from the handler arrive here before reaching the filter.
        // Log timing here; the filter handles the HTTP response.
        const ms = Date.now() - start;
        const status = (err as { status?: number })?.status ?? 500;
        this.logger.log(
          `← ${method} ${url} ${colorStatus(status)} +${ms}ms`,
        );
        return throwError(() => err);
      }),
    );
  }
}
