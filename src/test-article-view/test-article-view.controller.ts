import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Session,
} from '@nestjs/common';
import { TestArticleViewService } from './test-article-view.service';
import { LoginUserDto } from './dto/loginUser.dto';

@Controller('test-article-view')
export class TestArticleViewController {
  constructor(
    private readonly testArticleViewService: TestArticleViewService,
  ) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Session() session) {
    const user = await this.testArticleViewService.login(loginUserDto);

    // 将用户信息存入session
    session.user = {
      id: user.id,
      username: user.username,
    };

    return user;
  }

  @Get('article/:id')
  async getArticle(@Param('id') id: string) {
    const article = await this.testArticleViewService.getArticleById(id);
    return article;
  }

  @Post('article/:id/view')
  async viewArticle(@Param('id') id: string, @Session() session, @Req() req) {
    return await this.testArticleViewService.viewArticle(
      id,
      session?.user?.id || req.ip,
    );
  }
}
