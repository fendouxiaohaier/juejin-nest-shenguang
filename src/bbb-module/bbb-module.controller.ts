import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BbbModuleService } from './bbb-module.service';
import { CreateBbbModuleDto } from './dto/create-bbb-module.dto';
import { UpdateBbbModuleDto } from './dto/update-bbb-module.dto';

import { RequirePermission } from '../custom-decorator';
import { PermissionGuard } from 'src/test-rbac/permission.guard';
@Controller('bbb-module/')
export class BbbModuleController {
  constructor(private readonly bbbModuleService: BbbModuleService) {}

  @Post()
  create(@Body() createBbbModuleDto: CreateBbbModuleDto) {
    return this.bbbModuleService.create(createBbbModuleDto);
  }

  @Get('query_bbb')
  @RequirePermission('query_bbb')
  @UseGuards(PermissionGuard)
  findAll() {
    return this.bbbModuleService.findAll();
  }

  @Get(':id')
  @RequirePermission('query_bbbB')
  @UseGuards(PermissionGuard)
  findOne(@Param('id') id: string) {
    return this.bbbModuleService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBbbModuleDto: UpdateBbbModuleDto,
  ) {
    return this.bbbModuleService.update(+id, updateBbbModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bbbModuleService.remove(+id);
  }
}
