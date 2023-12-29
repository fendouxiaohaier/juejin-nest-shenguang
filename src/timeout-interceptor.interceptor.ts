import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import {
  Observable,
  TimeoutError,
  catchError,
  throwError,
  timeout,
} from 'rxjs';

@Injectable()
export class TimeoutInterceptorInterceptor implements NestInterceptor {
  private readonly logger = new Logger(TimeoutInterceptorInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      // 超过3秒没有返回就处理异常
      timeout(3000),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          this.logger.error(err.message);
          return throwError(async () => new RequestTimeoutException());
        }

        return throwError(() => err);
      }),
    );
  }
}
