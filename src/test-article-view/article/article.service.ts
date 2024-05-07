import { Inject, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Article } from './entity/article.entity';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class ArticleService {
  @Inject(EntityManager)
  private entityManager: EntityManager;

  @Inject(RedisService)
  private redisService: RedisService;

  async flushRedisToDB() {
    const keys = await this.getRedisByKeys('article_*');

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      const article = await this.redisService.hashGet(key);

      const [, id] = key.split('_');

      // 更新数据库
      await this.entityManager.update(
        Article,
        {
          id: +id,
        },
        {
          viewCount: +article.viewCount,
        },
      );
    }
  }

  async getRedisByKeys(key: string) {
    const keys = await this.redisService.keys(key);
    return keys;
  }

  async getArticleById(id: number) {
    return await this.entityManager.findOneBy(Article, {
      id,
    });
  }

  /**
   * 记录浏览文章的次数
   * @param id 文章id
   */
  async viewArticle(id: number) {
    const article = await this.getArticleById(id);

    article.viewCount++;

    this.entityManager.update(Article, id, {
      viewCount: article.viewCount,
    });

    return article;
  }
}
