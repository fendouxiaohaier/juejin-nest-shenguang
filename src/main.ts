import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Request, Response, NextFunction } from 'express';

import { AppModule } from './app.module';
import { TimeInterceptor } from './time.interceptor';
import { TestFilter } from './test.filter';
// import { LoginGuard } from './login.guard';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets('public', { prefix: '/static' });

  // 再来一个全局中间件
  app.use((req: Request, res: Response, next: NextFunction) => {
    // console.log('global before request', req.header);

    next();

    // console.log('global after response', res.header);
  });

  // 全局守卫
  // app.useGlobalGuards(new LoginGuard());

  // 全局拦截器 这种方式的拦截器里面不能注入其他依赖
  // app.useGlobalInterceptors(new TimeInterceptor());

  // 全局异常补捕获
  // app.useGlobalFilters(new TestFilter());

  await app.listen(3002);
}

bootstrap();
