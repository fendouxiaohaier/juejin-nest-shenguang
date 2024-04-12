import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateAccessTokenAndRefreshTokenDto } from './dto/create-access-token-and-refresh-token.dto';
import { UpdateAccessTokenAndRefreshTokenDto } from './dto/update-access-token-and-refresh-token.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';

@Injectable()
export class AccessTokenAndRefreshTokenService {
  // 通过@InjectEntityManager()方式引入数据库orm操作entityManager
  @InjectEntityManager()
  private entityManager: EntityManager;

  async findUserById(userId: number) {
    return await this.entityManager.findOne(User, {
      where: {
        id: userId,
      },
    });
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.entityManager.findOne(User, {
      where: {
        username: loginUserDto.username,
      },
    });

    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.OK);
    }

    if (user.password !== loginUserDto.password) {
      throw new HttpException('密码错误', HttpStatus.OK);
    }

    return user;
  }

  create(
    createAccessTokenAndRefreshTokenDto: CreateAccessTokenAndRefreshTokenDto,
  ) {
    return 'This action adds a new accessTokenAndRefreshToken';
  }

  findAll() {
    return `This action returns all accessTokenAndRefreshToken`;
  }

  findOne(id: number) {
    return `This action returns a #${id} accessTokenAndRefreshToken`;
  }

  update(
    id: number,
    updateAccessTokenAndRefreshTokenDto: UpdateAccessTokenAndRefreshTokenDto,
  ) {
    return `This action updates a #${id} accessTokenAndRefreshToken`;
  }

  remove(id: number) {
    return `This action removes a #${id} accessTokenAndRefreshToken`;
  }
}
