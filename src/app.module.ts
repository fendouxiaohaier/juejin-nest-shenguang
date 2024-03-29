import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { LogMiddleware } from './log.middleware';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { CustomDecoratorModule } from './custom-decorator/custom-decorator.module';
import { TestFilter } from './test.filter';
import { UploadFileModule } from './upload-file/upload-file.module';
import { UploadLargeFileModule } from './upload-large-file/upload-large-file.module';
import { TestMysqlModule } from './test-mysql/test-mysql.module';
import { TestNestTypeormModule } from './test-nest-typeorm/test-nest-typeorm.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './test-nest-typeorm/entities/test-nest-typeorm.entity';
import { TestNestRedisModule } from './test-nest-redis/test-nest-redis.module';
import { TestNestSessionCookitJwtModule } from './test-nest-session-cookit-jwt/test-nest-session-cookit-jwt.module';

@Module({
  imports: [
    PersonModule,
    CustomDecoratorModule,
    UploadFileModule,
    UploadLargeFileModule,
    TestMysqlModule,
    TestNestTypeormModule,
    // 全局引入TypeOrm示例
    TypeOrmModule.forRoot({
      type: 'mysql', // 是数据库的类型，因为 TypeORM 不只支持 MySQL 还支持 postgres、oracle、sqllite 等数据库
      host: 'localhost', // 数据库主机
      port: 3306, // 数据库端口
      username: 'root',
      password: 'root',
      database: 'docker_practice',
      synchronize: true,
      logging: true,
      entities: [User],
      migrations: [],
      subscribers: [],
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
    TestNestRedisModule,
    TestNestSessionCookitJwtModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // 这也是一种全局的注册处理Filter的方式，这种方式可以在Filter中注入其他依赖
    // {
    //   provide: APP_FILTER,
    //   useClass: TestFilter,
    // },
    {
      provide: APP_GUARD,
      useClass: LoginGuard, // 这种方式注入守卫也是全局，这种方式可以在里面再注意其他provide
    },
    {
      provide: APP_INTERCEPTOR, // 注意这里的provide名字是从nest/core里印出来的
      useClass: TimeInterceptor, // 这种方式注入拦截器也是全局，这种方式可以在里面再注入其他provide
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 只针对路由的中间件
    // 这里只对aaa*的路由生效
    consumer.apply(LogMiddleware).forRoutes('aaa*');
    // 下面这种forRoutes('*')针对任意路由生效
    // consumer.apply(LogMiddleware).forRoutes('*');

    // throw new Error('Method not implemented.');
  }
}
