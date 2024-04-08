import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Session,
} from '@nestjs/common';
import { TestAclService } from './test-acl.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('test-acl/')
export class TestAclController {
  constructor(private readonly testAclService: TestAclService) {}

  @Post('login')
  async login(@Body() loginUser: LoginUserDto, @Session() session) {
    const user = await this.testAclService.login(loginUser);

    session.user = {
      username: user.username,
    };

    return 'success';
  }

  @Get('init')
  async initData() {
    await this.testAclService.initData();
    return 'done';
  }

  @Get()
  findAll() {
    return this.testAclService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testAclService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testAclService.remove(+id);
  }
}
