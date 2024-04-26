import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { TestLoginByEmailService } from './test-login-by-email.service';

@Controller('test-login-by-email')
export class TestLoginByEmailController {
  constructor(
    private readonly testLoginByEmailService: TestLoginByEmailService,
  ) {}

  @Get('refreshToken')
  async refresh(@Query('refresh_token') refreshToken: string) {
    console.log('打印日志看看-refreshToken:', refreshToken);
  }

  @Get('emailCode')
  async sendEmailCode(@Query('address') address: string) {
    console.log('打印日志看看-address:', address);
    if (!address) {
      throw new BadRequestException('address不能为空');
    }

    await this.testLoginByEmailService.sendMail(address);
    return '发送成功';
  }

  @Get(':id')
  getParam(@Param('id') id: string) {
    console.log('打印日志看看-id:', id);
    return id;
  }
}
