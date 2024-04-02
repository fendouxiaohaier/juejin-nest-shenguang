import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Session,
  Res,
  Inject,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { TestNestSessionCookitJwtService } from './test-nest-session-cookit-jwt.service';
import { CreateTestNestSessionCookitJwtDto } from './dto/create-test-nest-session-cookit-jwt.dto';
import { UpdateTestNestSessionCookitJwtDto } from './dto/update-test-nest-session-cookit-jwt.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('test-nest-session-cookit-jwt')
export class TestNestSessionCookitJwtController {
  constructor(
    private readonly testNestSessionCookitJwtService: TestNestSessionCookitJwtService,
  ) {}

  @Inject(JwtService)
  private jwtService: JwtService;

  @Post()
  create(
    @Body()
    createTestNestSessionCookitJwtDto: CreateTestNestSessionCookitJwtDto,
  ) {
    return this.testNestSessionCookitJwtService.create(
      createTestNestSessionCookitJwtDto,
    );
  }

  @Get('session')
  findAllSession(@Session() session) {
    console.log(session);
    session.count = session.count ? session.count + 1 : 1;
    return session.count;
  }

  // 因为注入 response 对象之后，默认不会把返回值作为 body 了，需要设置 passthrough 为 true 才可以
  @Get('jwt')
  findAll(@Res({ passthrough: true }) response: Response) {
    const newToken = this.jwtService.sign({
      count: 1,
    });

    response.setHeader('token', newToken);
    return 'hello';
  }

  // 因为注入 response 对象之后，默认不会把返回值作为 body 了，需要设置 passthrough 为 true 才可以
  @Get('jwt2')
  findAllJwt(
    @Headers('authorization') authorization: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    if (authorization) {
      try {
        // 解析token
        const token = authorization.split(' ')[1];
        // 验证token
        const data = this.jwtService.verify(token);

        // 生成新token 内容为原来的token+1
        const newToken = this.jwtService.sign({
          count: data.count + 1,
        });

        // 插入header中原来的token
        response.setHeader('token', newToken);

        // 返回到http接口的新的值
        return data.count + 1;
      } catch (e) {
        console.log(e);
        // 解析错误 抛出无权限异常
        throw new UnauthorizedException();
      }
    } else {
      // 如果第一次 没有带token  就生成一个新的token
      const newToken = this.jwtService.sign({
        count: 1,
      });

      response.setHeader('token', newToken);
      return 1;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testNestSessionCookitJwtService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateTestNestSessionCookitJwtDto: UpdateTestNestSessionCookitJwtDto,
  ) {
    return this.testNestSessionCookitJwtService.update(
      +id,
      updateTestNestSessionCookitJwtDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testNestSessionCookitJwtService.remove(+id);
  }
}
