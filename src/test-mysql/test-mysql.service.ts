import { Injectable } from '@nestjs/common';
import { CreateTestMysqlDto } from './dto/create-test-mysql.dto';
import { UpdateTestMysqlDto } from './dto/update-test-mysql.dto';

@Injectable()
export class TestMysqlService {
  create(createTestMysqlDto: CreateTestMysqlDto) {
    return 'This action adds a new testMysql';
  }

  findAll() {
    return `This action returns all testMysql`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testMysql`;
  }

  update(id: number, updateTestMysqlDto: UpdateTestMysqlDto) {
    return `This action updates a #${id} testMysql`;
  }

  remove(id: number) {
    return `This action removes a #${id} testMysql`;
  }
}
