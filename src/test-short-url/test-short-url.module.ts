import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TestShortUrlService } from './test-short-url.service';
import { TestShortUrlController } from './test-short-url.controller';
import { UniqueCode } from './entity/UniqueCode.entity';
import { UniqueCodeService } from './unique-code/unique-code.service';
import { ShortLongMap } from './entity/ShortLongMap.entity';
import { ShortLongMapService } from './short-long-map/short-long-map.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'docker_practice',
      synchronize: true,
      logging: true,
      entities: [UniqueCode, ShortLongMap],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
  ],
  controllers: [TestShortUrlController],
  providers: [TestShortUrlService, UniqueCodeService, ShortLongMapService],
})
export class TestShortUrlModule {}
