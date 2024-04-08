import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TestAclService } from './test-acl.service';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { TestAclRedisService } from 'src/test-acl-redis/test-acl-redis.service';

/**
 * @description 接口访问权限验证
 */
@Injectable()
export class PermissionGuard implements CanActivate {
  // 注入TestAclService
  @Inject(TestAclService)
  private testAclService: TestAclService;

  // 注入TestAclRedisService
  @Inject(TestAclRedisService)
  private testAclRedisService: TestAclRedisService;

  // Reflector 用于获取接口metaData数据
  @Inject(Reflector)
  private reflector: Reflector;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    // 首先判断是否登录
    const user = request.session.user;
    if (!user) {
      throw new UnauthorizedException('用户未登录');
    }

    // 先从缓存redis中获取用户对应的permission
    let permissions = await this.testAclRedisService.listGet(
      `user_${user.username}_permissions`,
    );

    // 如果redis中没有换窜当前用户的权限，就从数据库查一次，
    // 然后将权限permission存在redis中 key由用户名组成 所以唯一
    if (permissions.length === 0) {
      const foundUser = await this.testAclService.findByUsername(user.username);
      permissions = foundUser.permissions.map((item) => item.name);

      this.testAclRedisService.listSet(
        `user_${user.username}_permissions`,
        permissions,
        60 * 30,
      );
    }

    // 获取访问接口的metaData数据 也就是对一个接口的权限配置
    const metaDataPermission: string = this.reflector.get(
      'permission',
      context.getHandler(),
    );

    // 查找当前用户的权限是否包含访问接口配置的metaData中的permission对应的数据
    // 有就正常继续访问
    // 没有就抛出异常
    if (permissions.some((permission) => metaDataPermission === permission)) {
      console.log(
        `${user.username}有${request.url}的${metaDataPermission}权限`,
      );
      return true;
    } else {
      throw new UnauthorizedException(`没有接口${request.url}的权限访问该接口`);
    }
  }
}
