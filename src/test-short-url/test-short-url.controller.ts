import {
  BadRequestException,
  Controller,
  Get,
  Query,
  Redirect,
} from '@nestjs/common';
import { TestShortUrlService } from './test-short-url.service';

@Controller('test-short-url')
export class TestShortUrlController {
  constructor(private readonly testShortUrlService: TestShortUrlService) {}

  @Get('short-url')
  async generateShortUrl(@Query('url') longUrl) {
    return this.testShortUrlService.generate(longUrl);
  }

  @Get('redirect')
  @Redirect()
  async redirect(@Query('shortUrl') shortUrl: string) {
    const longUrl = await this.testShortUrlService.getLongUrl(shortUrl);

    if (!longUrl) {
      throw new BadRequestException('短链不存在');
    }

    return {
      url: longUrl,
      statusCode: 302,
    };
  }
}
