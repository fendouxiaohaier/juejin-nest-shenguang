import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { TestEnvConfigService } from './test-env-config.service';
import { CreateTestEnvConfigDto } from './dto/create-test-env-config.dto';
import { UpdateTestEnvConfigDto } from './dto/update-test-env-config.dto';
import path = require('path');

import dotenv = require('dotenv');

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

// import yaml = require('js-yaml');
// import fs = require('fs');
import { ConfigService } from '@nestjs/config';

// const config = fs.readFileSync(path.join(__dirname, '../../hello.yaml'));

@Controller('test-env-config')
export class TestEnvConfigController {
  @Inject(ConfigService)
  private configService: ConfigService;

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

  @Get('configServiceApi')
  configServiceApi() {
    // 通过js-yaml读取配置文件
    return this.configService.get('aaa');
  }

  @Get('yamlConfig')
  yamlConfig() {
    // 通过js-yaml读取配置文件
    // return yaml.load(config);
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
