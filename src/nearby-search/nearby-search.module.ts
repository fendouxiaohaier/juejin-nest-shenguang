import { Module } from '@nestjs/common';
import { NearbySearchService } from './nearby-search.service';
import { NearbySearchController } from './nearby-search.controller';
import { RedisModule } from './redis/redis.module';

@Module({
  controllers: [NearbySearchController],
  providers: [NearbySearchService],
  imports: [RedisModule],
})
export class NearbySearchModule {}
