import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { LoginUserDto } from '../dto/loginUser.dto';
import { EntityManager } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  @Inject(EntityManager)
  private entityManager: EntityManager;

  async getUser(loginUserDto: LoginUserDto) {
    const user = await this.entityManager.findOne(User, {
      where: {
        username: loginUserDto.username,
      },
    });

    if (
      user.username !== loginUserDto.username ||
      user.password !== loginUserDto.password
    ) {
      throw new BadRequestException('用户名或密码错误');
    }

    return user;
  }
}
