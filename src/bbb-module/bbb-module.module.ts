import { Module } from '@nestjs/common';
import { BbbModuleService } from './bbb-module.service';
import { BbbModuleController } from './bbb-module.controller';

@Module({
  controllers: [BbbModuleController],
  providers: [BbbModuleService],
})
export class BbbModuleModule {}
