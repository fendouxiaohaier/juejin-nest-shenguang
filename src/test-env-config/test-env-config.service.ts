import { Injectable } from '@nestjs/common';
import { CreateTestEnvConfigDto } from './dto/create-test-env-config.dto';
import { UpdateTestEnvConfigDto } from './dto/update-test-env-config.dto';

@Injectable()
export class TestEnvConfigService {
  create(createTestEnvConfigDto: CreateTestEnvConfigDto) {
    return 'This action adds a new testEnvConfig';
  }

  findAll() {
    return `This action returns all testEnvConfig`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testEnvConfig`;
  }

  update(id: number, updateTestEnvConfigDto: UpdateTestEnvConfigDto) {
    return `This action updates a #${id} testEnvConfig`;
  }

  remove(id: number) {
    return `This action removes a #${id} testEnvConfig`;
  }
}
