import { Module } from '@nestjs/common';
import { TestCityWeatherService } from './test-city-weather.service';
import { TestCityWeatherController } from './test-city-weather.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    // 注册http请求模块,后续通过@Inject(HttpService)注入使用
    HttpModule.register({
      timeout: 5000,
    }),
  ],
  controllers: [TestCityWeatherController],
  providers: [TestCityWeatherService],
})
export class TestCityWeatherModule {}
