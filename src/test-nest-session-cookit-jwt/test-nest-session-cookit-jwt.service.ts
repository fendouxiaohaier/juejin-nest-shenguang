import { Injectable } from '@nestjs/common';
import { CreateTestNestSessionCookitJwtDto } from './dto/create-test-nest-session-cookit-jwt.dto';
import { UpdateTestNestSessionCookitJwtDto } from './dto/update-test-nest-session-cookit-jwt.dto';

@Injectable()
export class TestNestSessionCookitJwtService {
  create(createTestNestSessionCookitJwtDto: CreateTestNestSessionCookitJwtDto) {
    return 'This action adds a new testNestSessionCookitJwt';
  }

  findAll() {
    return `This action returns all testNestSessionCookitJwt`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testNestSessionCookitJwt`;
  }

  update(
    id: number,
    updateTestNestSessionCookitJwtDto: UpdateTestNestSessionCookitJwtDto,
  ) {
    return `This action updates a #${id} testNestSessionCookitJwt`;
  }

  remove(id: number) {
    return `This action removes a #${id} testNestSessionCookitJwt`;
  }
}
