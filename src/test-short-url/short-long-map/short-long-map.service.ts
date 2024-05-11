import { Inject, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

import { UniqueCode } from '../entity/UniqueCode.entity';
import { UniqueCodeService } from '../unique-code/unique-code.service';
import { ShortLongMap } from '../entity/ShortLongMap.entity';

@Injectable()
export class ShortLongMapService {
  @InjectEntityManager()
  private entityManager: EntityManager;

  @Inject(UniqueCodeService)
  private uniqueCodeService: UniqueCodeService;

  async generate(longUrl: string) {
    // 查出一个未使用的短链码
    let uniqueCode = await this.entityManager.findOneBy(UniqueCode, {
      status: 0,
    });

    // 没有可用的，就生成一个短链唯一码
    if (!uniqueCode) {
      uniqueCode = await this.uniqueCodeService.generateCode();
    }

    // 然后再插入ShortLongMap表
    const map = new ShortLongMap();
    map.shortUrl = uniqueCode.code;
    map.longUrl = longUrl;

    await this.entityManager.insert(ShortLongMap, map);

    // 重新更新下UniqueCode表，设置status为1
    await this.entityManager.update(
      UniqueCode,
      {
        id: uniqueCode.id,
      },
      {
        status: 1,
      },
    );

    return uniqueCode.code;
  }

  async getLongUrl(shortUrl: string) {
    console.log('打印日志看看-shortUrl:', shortUrl);
    const map = await this.entityManager.findOneBy(ShortLongMap, {
      shortUrl,
    });

    return map?.longUrl;
  }
}
