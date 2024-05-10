import { Inject, Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { OnEvent } from '@nestjs/event-emitter';
import { CreateUserDto } from '../dto/createUser.dto';

@Injectable()
export class NotificationService {
  @Inject(EmailService)
  private emailService: EmailService;

  @OnEvent('user.register')
  async handleUserRegister(createUser: CreateUserDto) {
    // 记日志
    console.log('user.register');

    // 发邮件
    await this.emailService.sendMail({
      to: createUser.email,
      subject: '欢迎' + createUser.username,
      html: '欢迎新人',
    });
  }
}
