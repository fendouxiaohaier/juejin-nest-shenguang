import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class TimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // 获取处理的controller和对应的路由处理函数
    console.log(context.getClass(), context.getHandler());

    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        console.log('time-1: ', Date.now() - startTime);
      }),
    );
  }
}
