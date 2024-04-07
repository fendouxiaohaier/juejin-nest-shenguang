import { Module } from '@nestjs/common';
import { MysqlTypeormJwtLoginService } from './mysql-typeorm-jwt-login.service';
import { MysqlTypeormJwtLoginController } from './mysql-typeorm-jwt-login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './dto/create-mysql-typeorm-jwt-login.dto';

@Module({
  imports: [
    // 导入数据库
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'docker_practice',
      synchronize: true,
      logging: true,
      entities: [User],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
    // 在service中通过 @InjectRepository(User)注入
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [MysqlTypeormJwtLoginController],
  providers: [MysqlTypeormJwtLoginService],
})
export class MysqlTypeormJwtLoginModule {}
