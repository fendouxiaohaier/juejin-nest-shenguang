import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { LogMiddleware } from './log.middleware';
import { LoginGuard } from './global-login.guard';
import { TimeInterceptor } from './time.interceptor';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { CustomDecoratorModule } from './custom-decorator/custom-decorator.module';
// import { TestFilter } from './test.filter';
import { UploadFileModule } from './upload-file/upload-file.module';
import { UploadLargeFileModule } from './upload-large-file/upload-large-file.module';
// import { TestMysqlModule } from './test-mysql/test-mysql.module';
// import { TestNestTypeormModule } from './test-nest-typeorm/test-nest-typeorm.module';
// import { TypeOrmModule } from '@nestjs/typeorm';

// import { User } from './test-nest-typeorm/entities/test-nest-typeorm.entity';
// import { TestNestRedisModule } from './test-nest-redis/test-nest-redis.module';
// import { TestNestSessionCookitJwtModule } from './test-nest-session-cookit-jwt/test-nest-session-cookit-jwt.module';
import { MysqlTypeormJwtLoginModule } from './mysql-typeorm-jwt-login/mysql-typeorm-jwt-login.module';
// import { TestAclModule } from './test-acl/test-acl.module';
// import { AaaModuleModule } from './aaa-module/aaa-module.module';
// import { BbbModuleModule } from './bbb-module/bbb-module.module';
// import { TestAclRedisModule } from './test-acl-redis/test-acl-redis.module';
// import { TestRbacModule } from './test-rbac/test-rbac.module';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenAndRefreshTokenModule } from './access-token-and-refresh-token/access-token-and-refresh-token.module';
// import { TestEnvConfigModule } from './test-env-config/test-env-config.module';
import { DockerComposeTestModule } from './docker-compose-test/docker-compose-test.module';
import { TestRedisSessionModule } from './test-redis-session/test-redis-session.module';
import { NearbySearchModule } from './nearby-search/nearby-search.module';
import { TestSendFetchMailModule } from './test-send-fetch-mail/test-send-fetch-mail.module';
import { TestLoginByEmailModule } from './test-login-by-email/test-login-by-email.module';
import { EmailUser } from './test-login-by-email/user/entity/User.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: '11.40.81.217',
    //   port: 3306,
    //   username: 'root',
    //   password: 'root',
    //   database: 'docker_practice',
    //   synchronize: true,
    //   logging: true,
    //   entities: [EmailUser],
    //   poolSize: 10,
    //   connectorPackage: 'mysql2',
    //   extra: {
    //     authPlugin: 'sha256_password',
    //   },
    // }),
    // 注入jwt，后续通过@Inject(JwtService)引入
    JwtModule.register({
      secret: 'liYang', // 秘钥
      signOptions: {
        expiresIn: '7d', // 过期时间
      },
      // 设置为全局模块，这样不用每个模块都引入 10以上版本的@nestjs/jwt才有
      global: true,
    }),
    // PersonModule,
    // CustomDecoratorModule,
    // UploadFileModule,
    // UploadLargeFileModule,
    // TestMysqlModule,
    // TestNestTypeormModule,
    // 全局引入TypeOrm示例
    // TypeOrmModule.forRoot({
    //   type: 'mysql', // 是数据库的类型，因为 TypeORM 不只支持 MySQL 还支持 postgres、oracle、sqllite 等数据库
    //   host: 'localhost', // 数据库主机
    //   port: 3306, // 数据库端口
    //   username: 'root',
    //   password: 'root',
    //   database: 'docker_practice',
    //   synchronize: true,
    //   logging: true,
    //   entities: [User],
    //   migrations: [],
    //   subscribers: [],
    //   connectorPackage: 'mysql2',
    //   extra: {
    //     authPlugin: 'sha256_password',
    //   },
    // }),
    // TestNestRedisModule, // 暂时注销redis相关测试代码
    // TestNestSessionCookitJwtModule,  // 测试登录时使用session或jwt保存登录数据
    // TestAclModule, // 测试基于访问控制表控制用户权限
    // 辅助测试test-acl
    // AaaModuleModule,
    // 辅助测试test-acl
    // BbbModuleModule,
    // TestRbacModule,
    // AccessTokenAndRefreshTokenModule,
    // TestEnvConfigModule,
    // DockerComposeTestModule,
    // TestRedisSessionModule,
    // NearbySearchModule,
    // TestSendFetchMailModule,
    TestLoginByEmailModule,
    // MysqlTypeormJwtLoginModule, // 测过就注释掉，免得启动点饿时候去链接mysql
    // TestAclRedisModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // 这也是一种全局的注册处理Filter的方式，这种方式可以在Filter中注入其他依赖
    // {
    //   provide: APP_FILTER,
    //   useClass: TestFilter,
    // },
    // 测试获取配置文件，先注释
    // {
    //   provide: APP_GUARD,
    //   useClass: LoginGuard, // 这种方式注入守卫也是全局，这种方式可以在里面再注入其他provide
    // },
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
