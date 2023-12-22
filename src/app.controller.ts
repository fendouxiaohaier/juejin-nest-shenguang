import {
  Controller,
  Get,
  Inject,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';
import { TestFilter } from './test.filter';

@Controller()
// @UseInterceptors(TimeInterceptor) // 整个controller的拦截器
export class AppController {
  @Inject(AppService)
  private readonly appService: AppService;

  @Get()
  getHello(): string {
    console.log('handle getHello');
    return this.appService.getHello();
  }

  @UseGuards(LoginGuard) // 给某个路由设置守卫拦截器
  @Get('aaa')
  getHelloAaa(): string {
    console.log('handle getHelloAaa');
    return this.appService.getHello();
  }

  @Get('bbb')
  // @UseInterceptors(TimeInterceptor) // 局部路由拦截器
  getHelloBbb(): string {
    console.log('handle getHelloBbb');
    return this.appService.getHello();
  }

  // 这个接口用于测试pipe validate ValidatePipe
  @Get('ccc')
  @UseFilters(TestFilter) // 使用异常过滤器 这种方式是只给某个handler加一个过滤器
  getHelloCcc(@Query('num', ValidatePipe) num: number): string {
    console.log('handle getHelloCcc');
    return this.appService.getHello() + num;
  }
}
