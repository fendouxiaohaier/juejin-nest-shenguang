import { Inject, Injectable } from '@nestjs/common';
import { EmailService } from './email/email.service';

@Injectable()
export class TestLoginByEmailService {
  @Inject(EmailService)
  private emailService: EmailService;

  public async sendMail(address: string) {
    return this.emailService.sendMail({
      to: address,
      subject: '登录验证码',
      html: '<p>你的登录验证码是 123456,有效期5分钟</p>',
    });
  }
}
