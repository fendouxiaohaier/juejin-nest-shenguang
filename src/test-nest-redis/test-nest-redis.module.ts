import { Module } from '@nestjs/common';
import { TestNestRedisService } from './test-nest-redis.service';
import { TestNestRedisController } from './test-nest-redis.controller';
import { createClient } from 'redis';

@Module({
  controllers: [TestNestRedisController],
  providers: [
    TestNestRedisService,
    // 在当前module下创建redis实例
    // 使用redis实例的地方通过@Inject('REDIS_CLIENT')引入
    {
      provide: 'REDIS_CLIENT',
      async useFactory() {
        const client = createClient({
          socket: {
            host: 'localhost',
            port: 6379,
          },
        });
        await client.connect();
        return client;
      },
    },
  ],
})
export class TestNestRedisModule {}
