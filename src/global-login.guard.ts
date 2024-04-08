import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

// 因为默认的 session 里没有 user 的类型，所以需要扩展下：
declare module 'express-session' {
  interface Session {
    user: {
      username: string;
    };
  }
}

/**
 * @description 登录路由守卫 用于鉴定是否登录
 */
@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(AppService)
  private readonly appServer: AppService;

  /** 获取metadata的对象 */
  @Inject(Reflector)
  private reflector: Reflector;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    // 过滤 login 接口
    if (request.url.includes('login')) {
      return true;
    }

    // session中没有获取到用户名，抛出错误
    if (!request.session?.user) {
      throw new UnauthorizedException('用户未登录');
    }

    return true;
  }
}
