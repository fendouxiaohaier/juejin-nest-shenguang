import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType;

  async hashGet(key: string) {
    return await this.redisClient.hGetAll(key); // 获取哈希表 key 中所有字段和值
  }

  async hashSet(key: string, obj: Record<string, any>, ttl?: number) {
    for (const name in obj) {
      await this.redisClient.hSet(key, name, obj[name]); // 设置指定哈希表 key 中字段 field 的值为 value
    }

    if (ttl) {
      await this.redisClient.expire(key, ttl);
    }
  }
}
