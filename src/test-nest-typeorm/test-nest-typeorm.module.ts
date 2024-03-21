import { Module } from '@nestjs/common';
import { TestNestTypeormService } from './test-nest-typeorm.service';
import { TestNestTypeormController } from './test-nest-typeorm.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/test-nest-typeorm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // 在 user 模块引入 TypeOrmModule.forFeature 对应的动态模块，传入 User 的 Entity 可以在模块里注入 Repository 了
  controllers: [TestNestTypeormController],
  providers: [TestNestTypeormService],
})
export class TestNestTypeormModule {}
