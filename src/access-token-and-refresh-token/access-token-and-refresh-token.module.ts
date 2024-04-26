import { Module } from '@nestjs/common';
import { AccessTokenAndRefreshTokenService } from './access-token-and-refresh-token.service';
import { AccessTokenAndRefreshTokenController } from './access-token-and-refresh-token.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user';

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
      entities: [User],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
  ],
  controllers: [AccessTokenAndRefreshTokenController],
  providers: [AccessTokenAndRefreshTokenService],
})
export class AccessTokenAndRefreshTokenModule {}
