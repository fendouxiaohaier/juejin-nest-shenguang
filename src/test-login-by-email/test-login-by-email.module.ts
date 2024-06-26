import { Module } from '@nestjs/common';
// !!!注意这里TypeOrmModule  必须在controller之前引入 要不然会出现请求参数无法获取的情况
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestLoginByEmailService } from './test-login-by-email.service';
import { TestLoginByEmailController } from './test-login-by-email.controller';
import { UserModule } from './user/user.module';
import { EmailModule } from './email/email.module';
import { EmailUser } from './user/entity/User.entity';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './redis/redis.module';

/**
 * 通过邮箱验证码登录
 */
@Module({
  imports: [
    UserModule,
    EmailModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '11.40.81.217',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'docker_practice',
      synchronize: true,
      logging: true,
      entities: [EmailUser],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
    // 引入配置文件，并声明为全局的,在使用的地方通过构造函数获取:constructor(private configService: ConfigService)
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'src/.env',
    }),
    RedisModule,
  ],
  controllers: [TestLoginByEmailController],
  providers: [TestLoginByEmailService],
})
export class TestLoginByEmailModule {}
