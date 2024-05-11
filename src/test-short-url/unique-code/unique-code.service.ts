import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { generateRandomStr } from '../util';
import { UniqueCode } from '../entity/UniqueCode.entity';

@Injectable()
export class UniqueCodeService {
  @InjectEntityManager()
  private entityManager: EntityManager;

  async generateCode(): Promise<UniqueCode> {
    const randomStr = generateRandomStr(6);

    // 是否已经存在相同的短链唯一码
    const uniqueCode = await this.entityManager.findOneBy(UniqueCode, {
      code: randomStr,
    });

    // 不存在，插入数据库，然后返回唯一码
    if (!uniqueCode) {
      const code = new UniqueCode();
      code.code = randomStr;
      code.status = 0;

      await this.entityManager.insert(UniqueCode, code);

      return code;
    } else {
      // 存在，则重新执行一遍generateCode
      return this.generateCode();
    }
  }
}
