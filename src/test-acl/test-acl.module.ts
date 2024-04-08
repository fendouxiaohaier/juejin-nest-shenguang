import { Module } from '@nestjs/common';
import { TestAclService } from './test-acl.service';
import { TestAclController } from './test-acl.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { User } from './entities/user.entity';
import { PermissionGuard } from './permission.guard';

/**
 * 基于 ACL 实现权限控制
 */
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'acl_test',
      synchronize: true,
      logging: true,
      entities: [User, Permission],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
  ],
  controllers: [TestAclController],
  providers: [TestAclService, PermissionGuard],
  exports: [TestAclService, PermissionGuard],
})
export class TestAclModule {}
