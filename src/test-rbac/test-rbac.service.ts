import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTestRbacDto } from './dto/create-test-rbac.dto';
import { UpdateTestRbacDto } from './dto/update-test-rbac.dto';
import { Permission } from './entities/permission';
import { User } from './entities/user';
import { Role } from './entities/role';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, In } from 'typeorm';
import { UserLoginDto } from './dto/user';

@Injectable()
export class TestRbacService {
  // 通过@InjectEntityManager方式注入entityManager
  @InjectEntityManager()
  entityManager: EntityManager;

  /**
   * 从数据库通过roleId查询相关的Role
   * @param roleIds
   * @returns
   */
  async findRolesByIds(roleIds: number[]) {
    return this.entityManager.find(Role, {
      where: {
        id: In(roleIds),
      },
      relations: {
        permissions: true,
      },
    });
  }

  async login(loginUserDto: UserLoginDto) {
    // 从数据库根据用户名查询用户
    const user = await this.entityManager.findOne(User, {
      where: {
        username: loginUserDto.username,
      },
      relations: {
        roles: true,
      },
    });

    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.ACCEPTED);
    }

    if (user.password !== loginUserDto.password) {
      throw new HttpException('密码错误', HttpStatus.ACCEPTED);
    }

    return user;
  }

  async initData() {
    const user1 = new User();
    user1.username = '张三';
    user1.password = '111111';

    const user2 = new User();
    user2.username = '李四';
    user2.password = '222222';

    const user3 = new User();
    user3.username = '王五';
    user3.password = '333333';

    const role1 = new Role();
    role1.name = '管理员';

    const role2 = new Role();
    role2.name = '普通用户';

    const permission1 = new Permission();
    permission1.name = '新增 aaa';

    const permission2 = new Permission();
    permission2.name = '修改 aaa';

    const permission3 = new Permission();
    permission3.name = '删除 aaa';

    const permission4 = new Permission();
    permission4.name = '查询 aaa';

    const permission5 = new Permission();
    permission5.name = '新增 bbb';

    const permission6 = new Permission();
    permission6.name = '修改 bbb';

    const permission7 = new Permission();
    permission7.name = '删除 bbb';

    const permission8 = new Permission();
    permission8.name = 'query_bbb';

    role1.permissions = [
      permission1,
      permission2,
      permission3,
      permission4,
      permission5,
      permission6,
      permission7,
    ];

    role2.permissions = [
      permission1,
      permission2,
      permission3,
      permission4,
      permission8,
    ];

    user1.roles = [role1];

    user2.roles = [role2];

    await this.entityManager.save(Permission, [
      permission1,
      permission2,
      permission3,
      permission4,
      permission5,
      permission6,
      permission7,
      permission8,
    ]);

    await this.entityManager.save(Role, [role1, role2]);

    await this.entityManager.save(User, [user1, user2]);
  }

  create(createTestRbacDto: CreateTestRbacDto) {
    return 'This action adds a new testRbac';
  }

  findAll() {
    return `This action returns all testRbac`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testRbac`;
  }

  update(id: number, updateTestRbacDto: UpdateTestRbacDto) {
    return `This action updates a #${id} testRbac`;
  }

  remove(id: number) {
    return `This action removes a #${id} testRbac`;
  }
}
