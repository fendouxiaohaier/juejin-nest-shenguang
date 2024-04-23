import { Injectable } from '@nestjs/common';
import { CreateTestRedisSessionDto } from './dto/create-test-redis-session.dto';
import { UpdateTestRedisSessionDto } from './dto/update-test-redis-session.dto';

@Injectable()
export class TestRedisSessionService {
  create(createTestRedisSessionDto: CreateTestRedisSessionDto) {
    return 'This action adds a new testRedisSession';
  }

  findAll() {
    return `This action returns all testRedisSession`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testRedisSession`;
  }

  update(id: number, updateTestRedisSessionDto: UpdateTestRedisSessionDto) {
    return `This action updates a #${id} testRedisSession`;
  }

  remove(id: number) {
    return `This action removes a #${id} testRedisSession`;
  }
}
