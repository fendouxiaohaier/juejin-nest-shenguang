import { Controller, Get, Param } from '@nestjs/common';
import { TestCityWeatherService } from './test-city-weather.service';

@Controller('test-city-weather')
export class TestCityWeatherController {
  constructor(
    private readonly testCityWeatherService: TestCityWeatherService,
  ) {}

  /**
   * 获取城市信息
   * @param city
   * @returns
   */
  @Get('weather/:city')
  async weather(@Param('city') city: string) {
    return await this.testCityWeatherService.weather(city);
  }
}
