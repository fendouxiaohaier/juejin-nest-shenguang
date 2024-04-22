import { Module } from '@nestjs/common';
import { DockerComposeTestService } from './docker-compose-test.service';
import { DockerComposeTestController } from './docker-compose-test.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aaa } from './entities/aaa.entity';
import { createClient } from 'redis';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '11.40.81.217', // 需要使用本机ip地址
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'docker_practice',
      synchronize: true,
      logging: true,
      entities: [Aaa],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
  ],
  controllers: [DockerComposeTestController],
  providers: [
    DockerComposeTestService,
    {
      provide: 'REDIS_CLIENT',
      async useFactory() {
        const client = createClient({
          socket: {
            host: '11.40.81.217',
            port: 6379,
          },
        });
        await client.connect();
        return client;
      },
    },
  ],
})
export class DockerComposeTestModule {}
