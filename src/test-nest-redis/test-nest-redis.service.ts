import { Inject, Injectable } from '@nestjs/common';
import { CreateTestNestRediDto } from './dto/create-test-nest-redi.dto';
import { UpdateTestNestRediDto } from './dto/update-test-nest-redi.dto';
import { RedisClientType } from 'redis';

@Injectable()
export class TestNestRedisService {
  @Inject('REDIS_CLIENT')
  private redisClient: RedisClientType;

  create(createTestNestRediDto: CreateTestNestRediDto) {
    return 'This action adds a new testNestRedi';
  }

  async findAll() {
    // 获取所有的key
    return await this.redisClient.keys('*');
  }

  findOne(id: number) {
    return `This action returns a #${id} testNestRedi`;
  }

  update(id: number, updateTestNestRediDto: UpdateTestNestRediDto) {
    return `This action updates a #${id} testNestRedi`;
  }

  remove(id: number) {
    return `This action removes a #${id} testNestRedi`;
  }
}
