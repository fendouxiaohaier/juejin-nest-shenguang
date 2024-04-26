import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { AccessTokenAndRefreshTokenService } from './access-token-and-refresh-token.service';
import { CreateAccessTokenAndRefreshTokenDto } from './dto/create-access-token-and-refresh-token.dto';
import { UpdateAccessTokenAndRefreshTokenDto } from './dto/update-access-token-and-refresh-token.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('access-token-and-refresh-token')
export class AccessTokenAndRefreshTokenController {
  // 在app.module中通过全局的方式注入了JwtService，所以这里可以直接引入
  @Inject(JwtService)
  private jwtService: JwtService;

  constructor(
    private readonly accessTokenAndRefreshTokenService: AccessTokenAndRefreshTokenService,
  ) {}

  @Get('query')
  query() {
    return 'success';
  }

  @Get('refreshToken')
  async refresh(@Query('refresh_token') refreshToken: string) {
    console.log('打印日志看看-refreshToken:', refreshToken);
    try {
      // 解析refreshToken
      const data = this.jwtService.verify(refreshToken);

      // 在数据库根据用户id查询用户
      const user = await this.accessTokenAndRefreshTokenService.findUserById(
        data.userId,
      );

      // 重新生成access_token
      const access_token = this.jwtService.sign(
        {
          userId: user.id,
          username: user.username,
        },
        {
          expiresIn: '30m',
        },
      );

      // 重新生成refresh_token
      const refresh_token = this.jwtService.sign(
        {
          userId: user.id,
        },
        {
          expiresIn: '7d',
        },
      );

      // 返回access_token和refresh_token
      return {
        access_token,
        refresh_token,
      };
    } catch (e) {
      throw new UnauthorizedException('token 已失效，请重新登录');
    }
  }

  @Post('login')
  async login(@Body() loginUser: LoginUserDto) {
    const user = await this.accessTokenAndRefreshTokenService.login(loginUser);

    // 生成access_token
    const access_token = this.jwtService.sign(
      {
        userId: user.id,
        username: user.username,
      },
      {
        expiresIn: '30m',
      },
    );

    // 生成refresh_token
    const refresh_token = this.jwtService.sign(
      {
        userId: user.id,
      },
      {
        expiresIn: '7d',
      },
    );

    return {
      access_token,
      refresh_token,
    };
  }

  @Post()
  create(
    @Body()
    createAccessTokenAndRefreshTokenDto: CreateAccessTokenAndRefreshTokenDto,
  ) {
    return this.accessTokenAndRefreshTokenService.create(
      createAccessTokenAndRefreshTokenDto,
    );
  }

  @Get()
  findAll() {
    return this.accessTokenAndRefreshTokenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accessTokenAndRefreshTokenService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateAccessTokenAndRefreshTokenDto: UpdateAccessTokenAndRefreshTokenDto,
  ) {
    return this.accessTokenAndRefreshTokenService.update(
      +id,
      updateAccessTokenAndRefreshTokenDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accessTokenAndRefreshTokenService.remove(+id);
  }
}
