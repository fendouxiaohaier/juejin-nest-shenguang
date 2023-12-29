import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

/**
 * @description 使用 rxjs的map operator 来对 controller 返回的数据做一些修改：
 */
@Injectable()
export class MapInterceptorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        code: 200,
        data,
        success: true,
      })),
    );
  }
}
