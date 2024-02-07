import { PartialType } from '@nestjs/mapped-types';
import { CreateTestMysqlDto } from './create-test-mysql.dto';

export class UpdateTestMysqlDto extends PartialType(CreateTestMysqlDto) {}
