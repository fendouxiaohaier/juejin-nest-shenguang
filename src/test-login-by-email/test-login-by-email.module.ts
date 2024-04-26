import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestLoginByEmailController } from './test-login-by-email.controller';
import { TestLoginByEmailService } from './test-login-by-email.service';
import { EmailUser } from './user/entity/User.entity';
import { EmailModule } from './email/email.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    EmailModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'docker_practice',
      synchronize: true,
      logging: true,
      entities: [EmailUser],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
  ],
  controllers: [TestLoginByEmailController],
  providers: [TestLoginByEmailService],
})
export class TestLoginByEmailModule {}
