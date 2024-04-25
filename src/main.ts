import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Request, Response, NextFunction } from 'express';

import { AppModule } from './app.module';
// import { TimeInterceptor } from './time.interceptor';
// import { TestFilter } from './test.filter';
// import { WinstonLogger } from './util/winstonLogger';
import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';
// import { LoginGuard } from './global-login.guard';

import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // logger: false, // 设置不开启全局日志
    // logger: ['error'], // 只展示error类型的日志
  });

  // 开启跨域支持
  app.enableCors();

  // 静态文件路径 通过http://localhost:8008/static/可以访问当前项目public下的文件
  app.useStaticAssets('public', { prefix: '/static' });

  // 再来一个全局中间件
  app.use((req: Request, res: Response, next: NextFunction) => {
    // console.log('global before request', req.header);

    next();

    // console.log('global after response', res.header);
  });

  // 全局登录守卫  这种方式不能再在LoginGuard里注入其他依赖
  // 采用在app.module里providers中注入的方式可以解决上面的问题
  // 所以这里注释掉
  // app.useGlobalGuards(new LoginGuard());

  // 全局拦截器 这种方式的拦截器里面不能注入其他依赖
  // app.useGlobalInterceptors(new TimeInterceptor());

  // 全局异常补捕获
  // app.useGlobalFilters(new TestFilter());

  // 将系统默认的日志系统改为使用自定义logger系统
  // app.useLogger(new WinstonLogger());

  // cookie 相关的解析包
  app.use(cookieParser());
  // cookie 相关的解析包

  // 全局入口模块启用session
  app.use(
    session({
      secret: 'yang', // 密钥
      saveUninitialized: false, //  saveUninitalized 设置为 true 是不管是否设置 session，都会初始化一个空的 session 对象
      resave: false, // resave 为 true 是每次访问都会更新 session，不管有没有修改 session 的内容，而 false 是只有 session 内容变了才会去更新 session。
    }),
  );
  // 入口模块启用session

  // 全局启动ValidationPipe 这样就可以和class-validator配合，对dto进行验证
  app.useGlobalPipes(new ValidationPipe());
  // 全局启动ValidationPipe

  await app.listen(8008);
}

bootstrap();
