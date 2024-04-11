import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { TestRbacService } from './test-rbac.service';
import { CreateTestRbacDto } from './dto/create-test-rbac.dto';
import { UpdateTestRbacDto } from './dto/update-test-rbac.dto';
import { UserLoginDto } from './dto/user';
import { JwtService } from '@nestjs/jwt';

@Controller('test-rbac/')
export class TestRbacController {
  @Inject(JwtService)
  private jwtService: JwtService;

  constructor(private readonly testRbacService: TestRbacService) {}

  @Get('init')
  initData() {
    this.testRbacService.initData();

    return 'success';
  }

  @Post('login')
  async login(@Body() loginUser: UserLoginDto) {
    const curUser = await this.testRbacService.login(loginUser);

    const token = this.jwtService.sign({
      user: {
        username: curUser.username,
        roles: curUser.roles,
      },
    });

    return { token };
  }

  @Post()
  create(@Body() createTestRbacDto: CreateTestRbacDto) {
    return this.testRbacService.create(createTestRbacDto);
  }

  @Get()
  findAll() {
    return this.testRbacService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testRbacService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTestRbacDto: UpdateTestRbacDto,
  ) {
    return this.testRbacService.update(+id, updateTestRbacDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testRbacService.remove(+id);
  }
}
