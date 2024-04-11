import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { AaaModuleService } from './aaa-module.service';
import { CreateAaaModuleDto } from './dto/create-aaa-module.dto';
import { UpdateAaaModuleDto } from './dto/update-aaa-module.dto';
// import { PermissionGuard } from 'src/test-acl/permission.guard';

@Controller('aaa-module')
export class AaaModuleController {
  constructor(private readonly aaaModuleService: AaaModuleService) {}

  @Post()
  create(@Body() createAaaModuleDto: CreateAaaModuleDto) {
    return this.aaaModuleService.create(createAaaModuleDto);
  }

  @Get()
  @SetMetadata('permission', 'query_aaa') // 设置元数据 这里是为了标记这个findAll接口的访问权限，只有拥有‘query_aaa’的权限的用户才可以访问 判断逻辑在守卫PermissionGuard中
  // @UseGuards(PermissionGuard) // 引入鉴权路由守卫
  findAll() {
    return this.aaaModuleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aaaModuleService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAaaModuleDto: UpdateAaaModuleDto,
  ) {
    return this.aaaModuleService.update(+id, updateAaaModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aaaModuleService.remove(+id);
  }
}
