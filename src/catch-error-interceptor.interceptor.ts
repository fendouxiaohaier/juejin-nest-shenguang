import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class CatchErrorInterceptorInterceptor implements NestInterceptor {
  private readonly logger = new Logger(CatchErrorInterceptorInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // 使用catchError 处理错误内容
    return next.handle().pipe(
      catchError((err) => {
        // 记录错误日志
        this.logger.error(err.message, err.stack);
        // 然后继续抛出
        return throwError(() => err);
      }),
    );
  }
}
