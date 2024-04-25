import { Injectable } from '@nestjs/common';
import { CreateTestSendFetchMailDto } from './dto/create-test-send-fetch-mail.dto';
import { UpdateTestSendFetchMailDto } from './dto/update-test-send-fetch-mail.dto';

@Injectable()
export class TestSendFetchMailService {
  create(createTestSendFetchMailDto: CreateTestSendFetchMailDto) {
    return 'This action adds a new testSendFetchMail';
  }

  findAll() {
    return `This action returns all testSendFetchMail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testSendFetchMail`;
  }

  update(id: number, updateTestSendFetchMailDto: UpdateTestSendFetchMailDto) {
    return `This action updates a #${id} testSendFetchMail`;
  }

  remove(id: number) {
    return `This action removes a #${id} testSendFetchMail`;
  }
}
