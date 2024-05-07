import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestArticleViewService } from './test-article-view.service';
import { TestArticleViewController } from './test-article-view.controller';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { Article } from './article/entity/article.entity';
import { User } from './user/entity/user.entity';
import { RedisModule } from './redis/redis.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    // 定时器module
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'docker_practice',
      synchronize: true,
      logging: true,
      entities: [Article, User],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
    UserModule,
    ArticleModule,
    RedisModule,
    TaskModule,
  ],
  controllers: [TestArticleViewController],
  providers: [TestArticleViewService],
})
export class TestArticleViewModule {}
