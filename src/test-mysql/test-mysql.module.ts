import { Module } from '@nestjs/common';
import { TestMysqlService } from './test-mysql.service';
import { TestMysqlController } from './test-mysql.controller';

@Module({
  controllers: [TestMysqlController],
  providers: [TestMysqlService],
})
export class TestMysqlModule {}
