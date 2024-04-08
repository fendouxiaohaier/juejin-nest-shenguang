import { PartialType } from '@nestjs/mapped-types';
import { CreateTestAclDto } from './create-test-acl.dto';

export class UpdateTestAclDto extends PartialType(CreateTestAclDto) {}
