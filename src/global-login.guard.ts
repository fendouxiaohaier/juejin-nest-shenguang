import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Role } from './test-rbac/entities/role';

// 因为默认的 session 里没有 user 的类型，所以需要扩展下：
declare module 'express-session' {
  interface Session {
    user: {
      username: string;
    };
  }
}

declare module 'express' {
  interface Request {
    user: {
      username: string;
      roles: Role[];
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

  @Inject(JwtService)
  private jwtService: JwtService;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    // 过滤 login 接口 和 refreshToken接口
    if (request.url.includes('login') || request.url.includes('refreshToken')) {
      return true;
    }

    const authorization = request.headers.authorization;

    // 系统采用两种方式登录 session 和 token
    // session中没有获取到用户名 并且也没有token 就抛出未登录的错误
    if (!request.session?.user && !authorization) {
      throw new UnauthorizedException('用户未登录');
    }

    try {
      const token = authorization.split(' ')[1];
      const data = this.jwtService.verify(token);

      console.log('打印日志看看-token:', data);

      // 这里为什么要挂到request上
      // 因为在PermissionGuard中，可以通过request.user拿到用户登录信息，然后进行权限对比
      request.user = data.user;

      return true;
    } catch (e) {
      throw new UnauthorizedException('token 失效，请重新登录');
    }
  }
}
