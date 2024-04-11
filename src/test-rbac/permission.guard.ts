import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { TestRbacService } from './test-rbac.service';
import { Role } from './entities/role';
import { Request } from 'express';
import { Permission } from './entities/permission';
import { Reflector } from '@nestjs/core';

/**
 * 扩展一下Request接口
 */
declare module 'express' {
  interface Request {
    user: {
      username: string;
      roles: Role[];
    };
  }
}

@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject(TestRbacService)
  private testRbacService: TestRbacService;

  @Inject(Reflector)
  private reflector: Reflector;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    if (!request.user) {
      return false;
    }

    // 通过用户的角色id，从数据库里查询对应的Role对象
    const roles = await this.testRbacService.findRolesByIds(
      request.user.roles.map((item) => item.id),
    );

    // 再获取对应的Role对象拥有的所有权限
    const permissions: Permission[] = roles.reduce((total, current) => {
      total.push(...current.permissions);
      return total;
    }, []);

    console.log('打印日志看看-所有的权限-permissions:', permissions);

    // 获取访问接口配置的权限
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      'require-permission',
      [context.getClass(), context.getHandler()],
    );

    console.log('打印日志看看-requiredPermissions:', requiredPermissions);

    // 关键步骤，进行对比，当前用户是否拥有当前接口权限
    for (let i = 0; i < requiredPermissions.length; i++) {
      const curPermission = requiredPermissions[i];
      const found = permissions.find((item) => item.name === curPermission);
      if (!found) {
        throw new UnauthorizedException('您没有访问该接口的权限');
      }
    }

    return true;
  }
}
