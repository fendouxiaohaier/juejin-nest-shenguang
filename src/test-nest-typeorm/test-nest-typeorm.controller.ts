import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TestNestTypeormService } from './test-nest-typeorm.service';
import { CreateTestNestTypeormDto } from './dto/create-test-nest-typeorm.dto';
import { UpdateTestNestTypeormDto } from './dto/update-test-nest-typeorm.dto';

@Controller('test-nest-typeorm')
export class TestNestTypeormController {
  constructor(
    private readonly testNestTypeormService: TestNestTypeormService,
  ) {}

  @Post()
  create(@Body() createTestNestTypeormDto: CreateTestNestTypeormDto) {
    return this.testNestTypeormService.create(createTestNestTypeormDto);
  }

  @Get()
  findAll() {
    return this.testNestTypeormService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testNestTypeormService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTestNestTypeormDto: UpdateTestNestTypeormDto,
  ) {
    return this.testNestTypeormService.update(+id, updateTestNestTypeormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testNestTypeormService.remove(+id);
  }
}
