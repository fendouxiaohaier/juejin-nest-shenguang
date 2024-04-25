import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TestSendFetchMailService } from './test-send-fetch-mail.service';
import { CreateTestSendFetchMailDto } from './dto/create-test-send-fetch-mail.dto';
import { UpdateTestSendFetchMailDto } from './dto/update-test-send-fetch-mail.dto';

@Controller('test-send-fetch-mail')
export class TestSendFetchMailController {
  constructor(
    private readonly testSendFetchMailService: TestSendFetchMailService,
  ) {}

  @Post()
  create(@Body() createTestSendFetchMailDto: CreateTestSendFetchMailDto) {
    return this.testSendFetchMailService.create(createTestSendFetchMailDto);
  }

  @Get()
  findAll() {
    return this.testSendFetchMailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testSendFetchMailService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTestSendFetchMailDto: UpdateTestSendFetchMailDto,
  ) {
    return this.testSendFetchMailService.update(
      +id,
      updateTestSendFetchMailDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testSendFetchMailService.remove(+id);
  }
}
