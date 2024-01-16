import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFiles,
  ValidationPipe,
  UseFilters,
  Logger,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { TestFilter } from 'src/test.filter';
import { logger } from 'src/util/logger';

// 下面五种方式传递数据
@Controller('api/person/')
export class PersonController {
  private logger: Logger;

  constructor(private readonly personService: PersonService) {
    this.logger = new Logger();
  }

  // 文件方式
  @Post('file')
  @UseInterceptors(
    AnyFilesInterceptor({
      dest: 'uploads/',
    }),
  )
  body2(
    @Body() createPersonDto: CreatePersonDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    console.log(files);
    console.log(
      '打印日志看看-createPersonDto:',
      JSON.stringify(createPersonDto),
    );
    return `received: ${JSON.stringify(createPersonDto)}`;
  }

  // json方式
  @Post('/json')
  bodyJson(@Body() createPersonDto: CreatePersonDto) {
    // return `received: ${JSON.stringify(createPersonDto)}`;
    // 返回对象，前端接收到的就是一个对象
    return { name: createPersonDto.email };
  }

  // form url 方式
  @Post()
  body(@Body() createPersonDto: CreatePersonDto) {
    return `received form url: ${JSON.stringify(createPersonDto)}`;
  }

  // query param 方式
  @Get('find')
  query(@Query('name') name: string, @Query('age') age: number) {
    // 采用nest提供的系统日志系统
    this.logger.debug('aaa');
    this.logger.error('bbb');
    this.logger.log('ccc');
    // 返回字符串 接收到的data里就是字符串
    return `received: name=${name},age=${age}`;
  }

  // url param 方式
  @Get(':id')
  urlParam(@Param('id') id: string) {
    // 使用winston日志系统输出日志
    logger.info('info 日志');
    logger.error('error 日志');
    // 返回字符串 接收到的data里就是字符串
    return `received: id=${id}`;
  }

  @Post('createPerson')
  @UseFilters(TestFilter) // ValidationPipe配合UseFilters 可以自定义返回错误
  create(@Body(new ValidationPipe()) createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  @Get()
  findAll() {
    return this.personService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personService.remove(+id);
  }
}
