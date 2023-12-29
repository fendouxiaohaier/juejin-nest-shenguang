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
import { MapInterceptorInterceptor } from './map-interceptor.interceptor';
import { TapInterceptorInterceptor } from './tap-interceptor.interceptor';
import { CatchErrorInterceptorInterceptor } from './catch-error-interceptor.interceptor';
import { TimeoutInterceptorInterceptor } from './timeout-interceptor.interceptor';

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
  @UseInterceptors(MapInterceptorInterceptor)
  @Get('aaa')
  getHelloAaa(): string {
    console.log('handle getHelloAaa');
    return this.appService.getHello();
  }

  @Get('bbb')
  @UseInterceptors(TapInterceptorInterceptor)
  // @UseInterceptors(TimeInterceptor) // 局部路由拦截器
  getHelloBbb(): string {
    console.log('handle getHelloBbb');
    return this.appService.getHello();
  }

  // 这个接口用于测试pipe validate ValidatePipe
  @Get('ccc')
  @UseInterceptors(CatchErrorInterceptorInterceptor) // 使用CatchErrorInterceptorInterceptor拦截器处理
  @UseFilters(TestFilter) // 使用异常过滤器 这种方式是只给某个handler加一个过滤器
  // ValidatePipe 对参数进行验证的pipe
  getHelloCcc(@Query('num', ValidatePipe) num: number): string {
    console.log('handle getHelloCcc');
    return this.appService.getHello() + num;
  }

  // 这个接口用于测试超时异常处理
  @Get('ddd')
  @UseInterceptors(TimeoutInterceptorInterceptor) // 使用TimeoutInterceptorInterceptor拦截器处理
  async getHelloDdd(): Promise<string> {
    console.log('handle getHelloDdd');

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('321');
      }, 4000);
    });
    return this.appService.getHello();
  }
}
