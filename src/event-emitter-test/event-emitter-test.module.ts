import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventEmitterTestService } from './event-emitter-test.service';
import { EventEmitterTestController } from './event-emitter-test.controller';
import { UserModule } from './user/user.module';
import { NotificationModule } from './notification/notification.module';
import { EmailModule } from './email/email.module';

@Module({
  controllers: [EventEmitterTestController],
  providers: [EventEmitterTestService],
  imports: [
    UserModule,
    NotificationModule,
    EmailModule,
    EventEmitterModule.forRoot(),
  ],
})
export class EventEmitterTestModule {}
