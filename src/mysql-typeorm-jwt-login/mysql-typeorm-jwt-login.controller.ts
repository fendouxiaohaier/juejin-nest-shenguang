import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MysqlTypeormJwtLoginService } from './mysql-typeorm-jwt-login.service';
import { User } from './dto/create-mysql-typeorm-jwt-login.dto';
import { UpdateMysqlTypeormJwtLoginDto } from './dto/update-mysql-typeorm-jwt-login.dto';
import { LoginDto } from './dto/Login.dto';
import { RegisterDto } from './dto/Register.dto';

@Controller('mysql-typeorm-jwt-login/')
export class MysqlTypeormJwtLoginController {
  constructor(
    private readonly mysqlTypeormJwtLoginService: MysqlTypeormJwtLoginService,
  ) {}

  @Post('login')
  login(@Body() loginUser: LoginDto) {
    console.log('打印日志看看-loginUser:', loginUser);
  }

  @Post('register')
  register(@Body() registerUser: RegisterDto) {
    console.log('打印日志看看-registerUser:', registerUser);
  }
}
