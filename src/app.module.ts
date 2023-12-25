import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { LogMiddleware } from './log.middleware';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { CustomDecoratorModule } from './custom-decorator/custom-decorator.module';

@Module({
  imports: [PersonModule, CustomDecoratorModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: LoginGuard, // 这种方式注入守卫也是全局，这种方式可以在里面再注意其他provide
    },
    {
      provide: APP_INTERCEPTOR, // 注意这里的provide名字是从nest/core里印出来的
      useClass: TimeInterceptor, // 这种方式注入拦截器也是全局，这种方式可以在里面再注意其他provide
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 只针对路由的中间件
    // 这里只对aaa*的路由生效
    consumer.apply(LogMiddleware).forRoutes('aaa*');

    // throw new Error('Method not implemented.');
  }
}
