import { Module } from '@nestjs/common';
import { TestEnvConfigService } from './test-env-config.service';
import { TestEnvConfigController } from './test-env-config.controller';

@Module({
  controllers: [TestEnvConfigController],
  providers: [TestEnvConfigService],
})
export class TestEnvConfigModule {}
