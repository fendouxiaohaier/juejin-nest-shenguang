import { Injectable } from '@nestjs/common';
import { User } from './dto/create-mysql-typeorm-jwt-login.dto';
import { UpdateMysqlTypeormJwtLoginDto } from './dto/update-mysql-typeorm-jwt-login.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MysqlTypeormJwtLoginService {
  // 注入 User 对应的 Repository
  @InjectRepository(User)
  private userRepository: Repository<User>;
}
