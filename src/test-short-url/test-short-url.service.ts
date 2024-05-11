import { Inject, Injectable } from '@nestjs/common';
import { ShortLongMapService } from './short-long-map/short-long-map.service';

@Injectable()
export class TestShortUrlService {
  @Inject(ShortLongMapService)
  private shortLongMapService: ShortLongMapService;

  async generate(url: string) {
    return await this.shortLongMapService.generate(url);
  }

  async getLongUrl(shortUrl: string) {
    return await this.shortLongMapService.getLongUrl(shortUrl);
  }
}
