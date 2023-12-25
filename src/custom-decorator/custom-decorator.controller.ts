import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  Query,
  // UseGuards,
} from '@nestjs/common';
import { CustomDecoratorService } from './custom-decorator.service';
import { CreateCustomDecoratorDto } from './dto/create-custom-decorator.dto';
import { UpdateCustomDecoratorDto } from './dto/update-custom-decorator.dto';
// import { LoginGuard } from 'src/login.guard';
import { AaaDecorator } from 'src/aaa-decorator.decorator';
import { applyDecoratorsBbb } from './applyDecorators';
import { Ccc } from 'src/aaa-param-decorator.decorator';
import { CccHeader } from 'src/aaa-header-decorator.decorator';
import { MyQuery } from 'src/aaa-query-decorator.decorator';

@Controller('custom-decorator')
export class CustomDecoratorController {
  constructor(
    private readonly customDecoratorService: CustomDecoratorService,
  ) {}

  @Post()
  create(@Body() createCustomDecoratorDto: CreateCustomDecoratorDto) {
    return this.customDecoratorService.create(createCustomDecoratorDto);
  }

  @Get()
  @AaaDecorator('findAll-AaaDecorator')
  // @UseGuards(LoginGuard)  // 全局注入了LoginGuard守卫 不能在这里单独注入
  findAll() {
    return this.customDecoratorService.findAll();
  }

  @applyDecoratorsBbb('hello', 'findAll-AaaDecorator-hello')
  findAllHello() {
    return this.customDecoratorService.findAll();
  }

  @Get('hello4')
  findOneHello4(@Ccc('id') id: string) {
    return id;
  }

  @Get('header')
  findOneHeader(@Headers('Accept') accept, @CccHeader('Accept') accept1) {
    return {
      accept,
      accept1,
    };
  }

  @Get('param')
  findOneParam(@Query('aaa') aaa: string, @MyQuery('bbb') bbb) {
    console.log('打印日志看看-aaa:', aaa);
    return {
      aaa,
      bbb,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customDecoratorService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomDecoratorDto: UpdateCustomDecoratorDto,
  ) {
    return this.customDecoratorService.update(+id, updateCustomDecoratorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customDecoratorService.remove(+id);
  }
}
