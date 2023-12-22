import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

/**
 * @description 路由守卫 一般用于鉴权
 */
@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(AppService)
  private readonly appServer: AppService;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log(context.getArgs().length);

    console.log('login check call appServer' + this.appServer.getHello());
    // return false;
    return true;
  }
}
