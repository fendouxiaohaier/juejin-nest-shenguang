import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TestMysqlService } from './test-mysql.service';
import { CreateTestMysqlDto } from './dto/create-test-mysql.dto';
import { UpdateTestMysqlDto } from './dto/update-test-mysql.dto';

import { pool, AppDataSource } from './util';

import { User } from './entities/user';

@Controller('test-mysql/')
export class TestMysqlController {
  constructor(private readonly testMysqlService: TestMysqlService) {}

  @Post()
  create(@Body() createTestMysqlDto: CreateTestMysqlDto) {
    return this.testMysqlService.create(createTestMysqlDto);
  }

  @Get('get-customers')
  async getCustomers() {
    // 从连接池里拿连接
    const connection = await pool.getConnection();
    // 执行查询操作
    const [data, fields] = await connection.query('SELECT * FROM customers');

    // 返回 查询到的数据和字段名称
    return {
      data,
      fields: fields.map((r) => r.name),
    };
  }

  @Get('/test-orm')
  findAll() {
    AppDataSource.initialize()
      .then(async () => {
        console.log('Inserting a new user into the database...');
        const user = new User();
        user.firstName = 'Timber';
        user.lastName = 'Saw';
        user.age = 25;
        // 插入一条数据
        await AppDataSource.manager.save(user);
        console.log('Saved a new user with id: ' + user.id);

        console.log('Loading users from the database...');
        // 查询表里所有的数据
        const users = await AppDataSource.manager.find(User);
        console.log('Loaded users: ', users);

        console.log(
          'Here you can setup and run express / fastify / any other framework.',
        );
      })
      .catch((error) => console.log(error));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testMysqlService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTestMysqlDto: UpdateTestMysqlDto,
  ) {
    return this.testMysqlService.update(+id, updateTestMysqlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testMysqlService.remove(+id);
  }
}
