import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { TestLoginByEmailService } from './test-login-by-email.service';
import { LoginUserDto } from './dto/LoginUserDto.dto';
import { RedisService } from './redis/redis.service';
import { UserService } from './user/user.service';

@Controller('test-login-by-email')
export class TestLoginByEmailController {
  @Inject(RedisService)
  private redisService: RedisService;

  @Inject(UserService)
  private userService: UserService;

  constructor(
    private readonly testLoginByEmailService: TestLoginByEmailService,
  ) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const { email, code } = loginUserDto;

    const codeInRedis = await this.redisService.get(`captcha_${email}`);

    console.log('打印日志看看-codeInRedis:', codeInRedis);

    if (!codeInRedis) {
      throw new UnauthorizedException('验证码已失效');
    }
    if (code !== codeInRedis) {
      throw new UnauthorizedException('验证码不正确');
    }

    const user = await this.userService.findUserByEmail(email);
    console.log('打印日志看看-user:', user);

    if (user) {
      return 'success';
    }

    return 'fail';
  }

  @Get('emailCode')
  async sendEmailCode(@Query('address') address: string) {
    if (!address) {
      throw new BadRequestException('address不能为空');
    }

    await this.testLoginByEmailService.sendMail(address);
    return '发送成功';
  }
}
