import { Inject, Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/loginUser.dto';
import { UserService } from './user/user.service';
import { ArticleService } from './article/article.service';
import { RedisService } from './redis/redis.service';

@Injectable()
export class TestArticleViewService {
  @Inject(UserService)
  private userService: UserService;

  @Inject(ArticleService)
  private articleService: ArticleService;

  @Inject(RedisService)
  private redisService: RedisService;

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userService.getUser(loginUserDto);
    return user;
  }

  /**
   * 根据id获取对应的文章数据
   * @param id 文章id
   */
  async getArticleById(id: string) {
    return await this.articleService.getArticleById(+id);
  }

  async viewArticle(articleID: string, userId: string) {
    const articleRedisRes = await this.redisService.hashGet(
      `article_${articleID}`,
    );

    // 如果当前用户在3秒钟内浏览过，则不重复计算
    const viewedFlag = await this.redisService.get(
      `user_${userId}_article_${articleID}`,
    );

    // redis中不存在这篇文章，则从库中查出来缓存到redis中
    if (articleRedisRes?.viewCount === undefined || !viewedFlag) {
      // 浏览次数加1
      const article = await this.articleService.viewArticle(+articleID);

      // 将新的浏览次数保存到redis中
      await this.redisService.hashSet(`article_${articleID}`, {
        viewCount: article.viewCount,
        likeCount: article.likeCount,
        collectCount: article.collectCount,
      });

      // 当前用户阅读过的标记flag，为了测试方便，10秒过期。根据实际情况应该设置哥10分钟或20分钟
      await this.redisService.set(`user_${userId}_article_${articleID}`, 1, 10);

      // 返回最新的浏览次数
      return article.viewCount;
    }

    // 如果当前用户在10秒钟内浏览过，则不重复计算
    if (viewedFlag) {
      return +articleRedisRes.viewCount;
    }

    // 如果已经在redis中存在了当前文章，则直接在redis数据中加1，而暂时不更新数据库
    await this.redisService.hashSet(`article_${articleID}`, {
      ...articleRedisRes,
      viewCount: +articleRedisRes.viewCount + 1,
    });

    return +articleRedisRes.viewCount + 1;
  }
}
