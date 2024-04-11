import { Module } from '@nestjs/common';
import { AaaModuleService } from './aaa-module.service';
import { AaaModuleController } from './aaa-module.controller';
// import { TestAclModule } from 'src/test-acl/test-acl.module';

@Module({
  // 暂时注释掉，测试其他的, TestAclModule里引用了数据库，不注释掉会冲突
  // imports: [TestAclModule], // 这里用过imports方式引入TestAclModule， 然后就可以在AaaModuleController中通过@UseGuards(PermissionGuard)引入PermissionGuard
  controllers: [AaaModuleController],
  providers: [AaaModuleService],
})
export class AaaModuleModule {}
