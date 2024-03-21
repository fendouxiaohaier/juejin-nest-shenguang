import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CreateTestNestTypeormDto } from './dto/create-test-nest-typeorm.dto';
import { UpdateTestNestTypeormDto } from './dto/update-test-nest-typeorm.dto';
import { User } from './entities/test-nest-typeorm.entity';

@Injectable()
export class TestNestTypeormService {
  // 在app.module.ts中通过imports注入了数据库的配置  所以这里可以获取到对应的manager实例
  @InjectEntityManager()
  private manager: EntityManager;

  // 在module中通过TypeOrmModule.forFeature([User])导入了 所以这里可以注入
  @InjectRepository(User)
  private userRepository: Repository<User>;

  create(createUserDto: CreateTestNestTypeormDto) {
    // console.log(createUserDto);
    // this.manager.save(User, createUserDto);
    this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.manager.find(User);
  }

  findOne(id: number) {
    return this.manager.findOne(User, {
      where: { id },
    });
  }

  update(id: number, updateUserDto: UpdateTestNestTypeormDto) {
    this.manager.save(User, {
      id: id,
      ...updateUserDto,
    });
  }

  remove(id: number) {
    this.manager.delete(User, id);
  }
}
