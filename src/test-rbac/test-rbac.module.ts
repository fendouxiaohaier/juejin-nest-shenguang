import { Module } from '@nestjs/common';
import { TestRbacService } from './test-rbac.service';
import { TestRbacController } from './test-rbac.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role';
import { User } from './entities/user';
import { Permission } from './entities/permission';
import { PermissionGuard } from './permission.guard';

/**
 * 测试基于角色的权限控制模块
 */
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'rbac_test',
      synchronize: true,
      logging: true,
      entities: [Role, User, Permission],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
      autoLoadEntities: true,
    }),
  ],
  controllers: [TestRbacController],
  providers: [TestRbacService, PermissionGuard],
  exports: [TestRbacService, PermissionGuard], // PermissionGuard 里需要用到 UserService，所以在 UserModule 里导出下 UserService
})
export class TestRbacModule {}
