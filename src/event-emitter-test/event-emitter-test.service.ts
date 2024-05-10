import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class EventEmitterTestService {
  @Inject(EventEmitter2)
  private eventEmitter: EventEmitter2;

  createUser(createUserDto: CreateUserDto) {
    // 创建用户，省略
    // 触发通知服务
    this.eventEmitter.emit('user.register', {
      username: createUserDto.username,
      email: createUserDto.email,
    });

    return 'This action adds a new user';
  }
}
