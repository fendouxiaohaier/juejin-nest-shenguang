import { Global, Module } from '@nestjs/common';
import { createClient } from 'redis';
import { TestAclRedisService } from './test-acl-redis.service';

/**
 * @description
 * 辅助测试test-acl创建的redis对应的module
 * 声明为Global  这样全局都可以访问
 */
@Global()
@Module({
  providers: [
    TestAclRedisService,
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
  exports: [TestAclRedisService],
})
export class TestAclRedisModule {}
