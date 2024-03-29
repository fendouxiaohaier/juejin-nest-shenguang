import { Module } from '@nestjs/common';
import { TestNestSessionCookitJwtService } from './test-nest-session-cookit-jwt.service';
import { TestNestSessionCookitJwtController } from './test-nest-session-cookit-jwt.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    // 注入jwt，在后续通过@Inject(JwtService)引入
    JwtModule.register({
      secret: 'guang', // 秘钥
      signOptions: {
        expiresIn: '7d', // 过期时间
      },
    }),
  ],
  controllers: [TestNestSessionCookitJwtController],
  providers: [TestNestSessionCookitJwtService],
})
export class TestNestSessionCookitJwtModule {}
