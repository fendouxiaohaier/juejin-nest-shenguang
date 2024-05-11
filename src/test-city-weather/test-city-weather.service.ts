import { HttpService } from '@nestjs/axios';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import pinyin from 'pinyin';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TestCityWeatherService {
  @Inject(HttpService)
  private httpService: HttpService;

  async weather(city: string) {
    // 先转为拼音
    const cityPinyin = pinyin(city, { style: 'normal' }).join('');

    // 用拼音调用和风天气接口
    // 因为 HttpModule 把 axios 的方法返回值封装成了 rxjs 的 Observerable用firstValueFrom来把 rxjs Observable 转成 promise 的.
    const { data } = await firstValueFrom(
      this.httpService.get(
        `https://geoapi.qweather.com/v2/city/lookup?location=${cityPinyin}&key=ab4e7732e0df4def82c7f30b113bd4e7`,
      ),
    );

    // 调用7天预报天气预报接口
    const location = data?.['location']?.[0];

    if (!location) {
      throw new BadRequestException('没有对应的城市信息');
    }

    const { data: weatherData } = await firstValueFrom(
      this.httpService.get(
        `https://api.qweather.com/v7/weather/7d?location=${location.id}&key=187d6c3dd15f4d2d99e2a7e0ee08ba04`,
      ),
    );

    return weatherData;
  }
}
