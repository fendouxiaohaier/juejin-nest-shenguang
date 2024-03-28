import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TestNestRedisService } from './test-nest-redis.service';
import { CreateTestNestRediDto } from './dto/create-test-nest-redi.dto';
import { UpdateTestNestRediDto } from './dto/update-test-nest-redi.dto';

@Controller('test-nest-redis')
export class TestNestRedisController {
  constructor(private readonly testNestRedisService: TestNestRedisService) {}

  @Post()
  create(@Body() createTestNestRediDto: CreateTestNestRediDto) {
    return this.testNestRedisService.create(createTestNestRediDto);
  }

  @Get()
  findAll() {
    return this.testNestRedisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testNestRedisService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTestNestRediDto: UpdateTestNestRediDto,
  ) {
    return this.testNestRedisService.update(+id, updateTestNestRediDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testNestRedisService.remove(+id);
  }
}
