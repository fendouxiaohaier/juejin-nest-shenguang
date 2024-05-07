import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ArticleService } from '../article/article.service';

@Injectable()
export class TaskService {
  @Inject(ArticleService)
  private articleService: ArticleService;

  // 为了测试方便，这里设置为10秒钟任务执行一次。
  // 实际可以设置为了每晚4点 CronExpression.EVERY_DAY_AT_4AM
  @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron() {
    console.log('task execute');
    this.articleService.flushRedisToDB();
  }
}
