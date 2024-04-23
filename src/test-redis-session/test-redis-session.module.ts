import { Module } from '@nestjs/common';
import { TestRedisSessionService } from './test-redis-session.service';
import { TestRedisSessionController } from './test-redis-session.controller';
import { SessionModule } from './session/session.module';
import { RedisModule } from './redis/redis.module';

/**
 * 基于 Redis 实现分布式 session
 */
@Module({
  controllers: [TestRedisSessionController],
  providers: [TestRedisSessionService],
  imports: [SessionModule, RedisModule],
})
export class TestRedisSessionModule {}
