import { Module } from '@nestjs/common';
import { TestSendFetchMailService } from './test-send-fetch-mail.service';
import { TestSendFetchMailController } from './test-send-fetch-mail.controller';

@Module({
  controllers: [TestSendFetchMailController],
  providers: [TestSendFetchMailService],
})
export class TestSendFetchMailModule {}
