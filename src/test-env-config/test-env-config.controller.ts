import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TestEnvConfigService } from './test-env-config.service';
import { CreateTestEnvConfigDto } from './dto/create-test-env-config.dto';
import { UpdateTestEnvConfigDto } from './dto/update-test-env-config.dto';
import path = require('path');

import dotenv = require('dotenv');

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

@Controller('test-env-config')
export class TestEnvConfigController {
  constructor(private readonly testEnvConfigService: TestEnvConfigService) {}

  @Post()
  create(@Body() createTestEnvConfigDto: CreateTestEnvConfigDto) {
    return this.testEnvConfigService.create(createTestEnvConfigDto);
  }

  @Get()
  findAll() {
    return {
      ...process.env,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testEnvConfigService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTestEnvConfigDto: UpdateTestEnvConfigDto,
  ) {
    return this.testEnvConfigService.update(+id, updateTestEnvConfigDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testEnvConfigService.remove(+id);
  }
}
