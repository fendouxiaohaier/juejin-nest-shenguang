import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Req,
  Res,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { TestRedisSessionService } from './test-redis-session.service';
import { CreateTestRedisSessionDto } from './dto/create-test-redis-session.dto';
import { UpdateTestRedisSessionDto } from './dto/update-test-redis-session.dto';
import { SessionService } from './session/session.service';

@Controller('test-redis-session')
export class TestRedisSessionController {
  @Inject(SessionService)
  private sessionService: SessionService;

  constructor(
    private readonly testRedisSessionService: TestRedisSessionService,
  ) {}

  /**
   *
   * @param req
   * @param res 默认用了 @Res 传入 response 之后就需要手动返回响应了，比如 res.end('xxx')，如果还是想让 nest 把返回值作为响应，就加个 passthrough: true
   * @returns
   */
  @Get('count')
  async count(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const sid = req.cookies?.sid;

    // 获取sid对应的存放在redis中的值
    const session = await this.sessionService.getSession<{ count: string }>(
      sid,
    );

    // redis 虽然可以存整数、浮点数，但是它会转为 string 来存，所以取到的是 string，需要自己转换一下。
    const curCount = session.count ? parseInt(session.count) + 1 : 1;
    // 重新在redis中设置sid对应的count值
    const curSid = await this.sessionService.setSession(sid, {
      count: curCount,
    });

    // 在cookie中存放sid
    res.cookie('sid', curSid, { maxAge: 1800000 });
    return curCount;
  }

  @Post()
  create(@Body() createTestRedisSessionDto: CreateTestRedisSessionDto) {
    return this.testRedisSessionService.create(createTestRedisSessionDto);
  }

  @Get()
  findAll() {
    return this.testRedisSessionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testRedisSessionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTestRedisSessionDto: UpdateTestRedisSessionDto,
  ) {
    return this.testRedisSessionService.update(+id, updateTestRedisSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testRedisSessionService.remove(+id);
  }
}
