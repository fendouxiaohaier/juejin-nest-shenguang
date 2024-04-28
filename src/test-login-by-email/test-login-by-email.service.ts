import { Inject, Injectable } from '@nestjs/common';
import { EmailService } from './email/email.service';
import { RedisService } from './redis/redis.service';

@Injectable()
export class TestLoginByEmailService {
  @Inject(EmailService)
  private emailService: EmailService;

  @Inject(RedisService)
  private redisService: RedisService;

  public async sendMail(address: string) {
    const captchaCode = Math.random().toString().slice(2, 8);

    this.redisService.set(`captcha_${address}`, captchaCode, 60 * 5); // 5分钟内有效

    return this.emailService.sendMail({
      to: address,
      subject: '登录验证码',
      html: `<p>你的登录验证码是 ${captchaCode},有效期5分钟</p>`,
    });
  }
}
