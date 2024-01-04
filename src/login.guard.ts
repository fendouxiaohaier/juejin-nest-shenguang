import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { Reflector } from '@nestjs/core';

/**
 * @description 路由守卫 一般用于鉴权
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
    // 测试获取Metadata
    const metadata = this.reflector.get('aaa-decorator', context.getHandler());
    // console.log('打印日志看看-metadata:', metadata);

    // console.log(context.getArgs().length);

    // console.log('login check call appServer' + this.appServer.getHello());
    // return false;
    return true;
  }
}
