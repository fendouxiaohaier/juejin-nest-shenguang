import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BbbModuleService } from './bbb-module.service';
import { CreateBbbModuleDto } from './dto/create-bbb-module.dto';
import { UpdateBbbModuleDto } from './dto/update-bbb-module.dto';

@Controller('bbb-module')
export class BbbModuleController {
  constructor(private readonly bbbModuleService: BbbModuleService) {}

  @Post()
  create(@Body() createBbbModuleDto: CreateBbbModuleDto) {
    return this.bbbModuleService.create(createBbbModuleDto);
  }

  @Get()
  findAll() {
    return this.bbbModuleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bbbModuleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBbbModuleDto: UpdateBbbModuleDto) {
    return this.bbbModuleService.update(+id, updateBbbModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bbbModuleService.remove(+id);
  }
}
