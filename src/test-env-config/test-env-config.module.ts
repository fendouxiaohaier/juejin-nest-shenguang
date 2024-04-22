import { Module } from '@nestjs/common';
import { TestEnvConfigService } from './test-env-config.service';
import { TestEnvConfigController } from './test-env-config.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [TestEnvConfigController],
  providers: [TestEnvConfigService],
})
export class TestEnvConfigModule {}
