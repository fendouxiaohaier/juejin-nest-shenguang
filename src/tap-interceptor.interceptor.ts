import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class TapInterceptorInterceptor implements NestInterceptor {
  private readonly logger: Logger = new Logger(TapInterceptorInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap((data) => {
        // 做一些事情
        // 结束后记录日志
        this.logger.log('log something', data);
      }),
    );
  }
}
