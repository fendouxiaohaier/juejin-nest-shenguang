import { PartialType } from '@nestjs/mapped-types';
import { CreateTestRbacDto } from './create-test-rbac.dto';

export class UpdateTestRbacDto extends PartialType(CreateTestRbacDto) {}
