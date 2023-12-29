import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Response, Request } from 'express';
import { AppService } from './app.service';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  // 使用class方式写中间件是为了这里可以注入依赖。如果没有注入依赖的需求，则中间件可以写成function的形式
  @Inject(AppService)
  private appService: AppService;

  // 这里原来是any 需要手动标注res和res的类型
  use(req: Request, res: Response, next: () => void) {
    console.log('before LogMiddleware');
    console.log('调用appService的getHello方法：', this.appService.getHello());

    next();

    console.log('after LogMiddleware');
  }
}
