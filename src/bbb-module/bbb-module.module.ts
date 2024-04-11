import { Module } from '@nestjs/common';
import { BbbModuleService } from './bbb-module.service';
import { BbbModuleController } from './bbb-module.controller';
import { TestRbacModule } from 'src/test-rbac/test-rbac.module';

@Module({
  imports: [TestRbacModule], // 这里需要引入TestRbacModule， 因为在BbbModuleController使用了@UseGuards(PermissionGuard)，PermissionGuard中通过@Inject(TestRbacService)引入了TestRbacService
  controllers: [BbbModuleController],
  providers: [BbbModuleService],
})
export class BbbModuleModule {}
