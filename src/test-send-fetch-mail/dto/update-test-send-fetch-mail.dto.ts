import { PartialType } from '@nestjs/mapped-types';
import { CreateTestSendFetchMailDto } from './create-test-send-fetch-mail.dto';

export class UpdateTestSendFetchMailDto extends PartialType(CreateTestSendFetchMailDto) {}
